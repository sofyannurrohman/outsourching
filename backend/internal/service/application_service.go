package service

import (
	"errors"
	"time"

	"github.com/google/uuid"
	"github.com/outsourcehub/backend/internal/dto"
	"github.com/outsourcehub/backend/internal/model"
	"github.com/outsourcehub/backend/internal/repo"
	"gorm.io/gorm"
)

type ApplicationService struct {
	repo         *repo.ApplicationRepo
	talentRepo   *repo.TalentRepo
	jobRepo      *repo.JobRepo
	companyRepo  *repo.CompanyRepo
	notifService *NotificationService
}

func NewApplicationService(
	repo *repo.ApplicationRepo, 
	talentRepo *repo.TalentRepo, 
	jobRepo *repo.JobRepo,
	companyRepo *repo.CompanyRepo,
	notifService *NotificationService,
) *ApplicationService {
	return &ApplicationService{
		repo:         repo, 
		talentRepo:   talentRepo, 
		jobRepo:      jobRepo,
		companyRepo:  companyRepo,
		notifService: notifService,
	}
}

func (s *ApplicationService) Apply(userID uuid.UUID, req dto.ApplyJobRequest) (*dto.ApplicationResponse, error) {
	talent, err := s.talentRepo.FindByUserID(userID)
	if err != nil {
		return nil, errors.New("talent profile not found")
	}

	jobID, _ := uuid.Parse(req.JobID)
	job, err := s.jobRepo.FindByID(jobID)
	if err != nil {
		return nil, errors.New("job not found")
	}

	if job.Status != "open" {
		return nil, errors.New("this job is no longer accepting applications")
	}

	exists, _ := s.repo.ExistsByTalentAndJob(talent.ID, job.ID)
	if exists {
		return nil, errors.New("you have already applied for this job")
	}

	// Capture created application for notification
	var createdApp model.Application

	// Use transaction for global profile update + application
	err = s.repo.DB().Transaction(func(tx *gorm.DB) error {
		// 1. Update Talent Profile (Basic & Prof Info)
		talent.FullName = req.FullName
		talent.Phone = req.Phone
		talent.City = &req.Location
		talent.CurrentJobTitle = req.CurrentJobTitle
		talent.ExperienceYears = req.YearsExperience
		talent.ExpectedSalary = &req.ExpectedSalary
		talent.WorkType = &req.WorkType
		talent.Availability = &req.Availability
		talent.PortfolioURL = req.PortfolioURL
		talent.LinkedinURL = req.LinkedinURL

		if req.AvailableFrom != nil {
			t, err := time.Parse("2006-01-02", *req.AvailableFrom)
			if err == nil {
				talent.AvailableFrom = &t
			}
		}

		if err := tx.Save(talent).Error; err != nil {
			return err
		}

		// 2. Handle Relational Skills
		if len(req.Skills) > 0 {
			// Clear existing
			if err := tx.Where("talent_id = ?", talent.ID).Delete(&model.TalentSkill{}).Error; err != nil {
				return err
			}
			for _, sReq := range req.Skills {
				skillID, _ := uuid.Parse(sReq.ID)
				ts := model.TalentSkill{
					TalentID:        talent.ID,
					SkillID:         skillID,
					Level:           sReq.Level,
					YearsExperience: sReq.YearsExperience,
				}
				if err := tx.Create(&ts).Error; err != nil {
					return err
				}
			}
		}

		// 3. Handle Experiences
		if len(req.Experiences) > 0 {
			if err := tx.Where("talent_id = ?", talent.ID).Delete(&model.TalentExperience{}).Error; err != nil {
				return err
			}
			for _, eReq := range req.Experiences {
				start, _ := time.Parse("2006-01-02", eReq.StartDate)
				var end *time.Time
				if eReq.EndDate != nil {
					t, _ := time.Parse("2006-01-02", *eReq.EndDate)
					end = &t
				}
				exp := model.TalentExperience{
					TalentID:    talent.ID,
					CompanyName: eReq.CompanyName,
					Position:    eReq.Position,
					StartDate:   start,
					EndDate:     end,
					Description: eReq.Description,
				}
				if err := tx.Create(&exp).Error; err != nil {
					return err
				}
			}
		}

		// 4. Handle Education
		if len(req.Educations) > 0 {
			if err := tx.Where("talent_id = ?", talent.ID).Delete(&model.TalentEducation{}).Error; err != nil {
				return err
			}
			for _, eduReq := range req.Educations {
				edu := model.TalentEducation{
					TalentID:    talent.ID,
					Institution: eduReq.Institution,
					Major:       eduReq.Major,
					Degree:      eduReq.Degree,
					StartYear:   eduReq.StartYear,
					EndYear:     eduReq.EndYear,
				}
				if err := tx.Create(&edu).Error; err != nil {
					return err
				}
			}
		}

		// 5. Create Application
		createdApp = model.Application{
			JobID:              job.ID,
			TalentID:           talent.ID,
			CoverLetter:        req.CoverLetter,
			ScreeningQuestions: req.ScreeningQuestions,
			Status:             "pending",
		}
		if err := tx.Create(&createdApp).Error; err != nil {
			return err
		}

		return nil
	})

	if err != nil {
		return nil, err
	}

	// Trigger Notification for company
	go func() {
		// Fetch company to get email
		company, err := s.companyRepo.FindByID(job.CompanyID)
		if err == nil {
			s.notifService.NotifyNewApplication(&createdApp, company.User.Email)
		}
	}()

	// For simplicity, just return Success response with the new ID
	return &dto.ApplicationResponse{
		JobID:    job.ID.String(),
		TalentID: talent.ID.String(),
		Status:   "pending",
	}, nil
}

func (s *ApplicationService) ListTalentApplications(userID uuid.UUID, query dto.PaginationQuery) ([]dto.ApplicationResponse, int64, error) {
	talent, err := s.talentRepo.FindByUserID(userID)
	if err != nil {
		return nil, 0, err
	}

	query.Validate()
	apps, total, err := s.repo.ListByTalent(talent.ID, query)
	if err != nil {
		return nil, 0, err
	}

	res := make([]dto.ApplicationResponse, len(apps))
	for i, a := range apps {
		res[i] = *s.mapToResponse(&a)
	}

	return res, total, nil
}

func (s *ApplicationService) ListJobApplications(userID uuid.UUID, jobID uuid.UUID, query dto.PaginationQuery) ([]dto.ApplicationResponse, int64, error) {
	job, err := s.jobRepo.FindByID(jobID)
	if err != nil {
		return nil, 0, err
	}

	// Verify job ownership
	company, _ := s.companyRepo.FindByUserID(userID)
	if job.CompanyID != company.ID {
		return nil, 0, errors.New("unauthorized")
	}
	
	query.Validate()
	apps, total, err := s.repo.ListByJob(job.ID, query)
	if err != nil {
		return nil, 0, err
	}

	res := make([]dto.ApplicationResponse, len(apps))
	for i, a := range apps {
		res[i] = *s.mapToResponse(&a)
	}

	return res, total, nil
}

func (s *ApplicationService) UpdateStatus(userID uuid.UUID, appID uuid.UUID, req dto.UpdateApplicationStatusRequest) (*dto.ApplicationResponse, error) {
	app, err := s.repo.FindByID(appID)
	if err != nil {
		return nil, err
	}

	// Verify job ownership through company
	job, _ := s.jobRepo.FindByID(app.JobID)
	company, _ := s.companyRepo.FindByUserID(userID)
	if job.CompanyID != company.ID {
		return nil, errors.New("unauthorized to review this application")
	}

	app.Status = req.Status
	app.AdminNote = req.AdminNote
	now := time.Now()
	app.ReviewedAt = &now
	app.ReviewedBy = &userID

	if err := s.repo.Update(app); err != nil {
		return nil, err
	}

	// Reload with preloads for notification
	fullApp, _ := s.repo.FindByID(appID)
	
	// Trigger Notification for talent
	go s.notifService.NotifyStatusChange(fullApp, fullApp.Talent.User.Email)

	return s.mapToResponse(fullApp), nil
}

func (s *ApplicationService) mapToResponse(app *model.Application) *dto.ApplicationResponse {
	return &dto.ApplicationResponse{
		ID:          app.ID.String(),
		JobID:       app.JobID.String(),
		TalentID:    app.TalentID.String(),
		CoverLetter: app.CoverLetter,
		Status:      app.Status,
		AdminNote:   app.AdminNote,
		ReviewedAt:  app.ReviewedAt,
		CreatedAt:   app.CreatedAt,
	}
}
