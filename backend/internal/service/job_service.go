package service

import (
	"errors"
	"time"

	"github.com/google/uuid"
	"github.com/outsourcehub/backend/internal/dto"
	"github.com/outsourcehub/backend/internal/model"
	"github.com/outsourcehub/backend/internal/repo"
)

type JobService struct {
	jobRepo     *repo.JobRepo
	companyRepo *repo.CompanyRepo
}

func NewJobService(jobRepo *repo.JobRepo, companyRepo *repo.CompanyRepo) *JobService {
	return &JobService{jobRepo: jobRepo, companyRepo: companyRepo}
}

func (s *JobService) CreateJob(userID uuid.UUID, req dto.CreateJobRequest) (*dto.JobResponse, error) {
	company, err := s.companyRepo.FindByUserID(userID)
	if err != nil {
		return nil, errors.New("company profile not found")
	}

	// Subscription Gating Logic
	activeJobs, _ := s.jobRepo.CountByCompany(company.ID, "open")
	maxJobs := s.getMaxJobs(company.SubscriptionPlan)
	if maxJobs != -1 && int(activeJobs) >= maxJobs {
		return nil, errors.New("subscription limit reached. please upgrade your plan")
	}

	job := model.Job{
		CompanyID:      company.ID,
		Title:          req.Title,
		Description:    req.Description,
		Requirements:   req.Requirements,
		Location:       req.Location,
		JobType:        req.JobType,
		SalaryMin:      req.SalaryMin,
		SalaryMax:      req.SalaryMax,
		SkillsRequired: req.SkillsRequired,
		Status:         "draft",
		Slots:          1,
		CreatedBy:      userID,
	}

	if req.Deadline != nil {
		d, err := time.Parse("2006-01-02", *req.Deadline)
		if err == nil {
			job.Deadline = &d
		}
	}
	if req.Slots != nil {
		job.Slots = *req.Slots
	}

	if err := s.jobRepo.Create(&job); err != nil {
		return nil, err
	}

	return s.mapToResponse(&job), nil
}

func (s *JobService) GetJob(id uuid.UUID) (*dto.JobResponse, error) {
	job, err := s.jobRepo.FindByID(id)
	if err != nil {
		return nil, err
	}
	return s.mapToResponse(job), nil
}

func (s *JobService) ListPublicJobs(query dto.PaginationQuery) ([]dto.JobResponse, int64, error) {
	query.Validate()
	jobs, total, err := s.jobRepo.ListPublic(query)
	if err != nil {
		return nil, 0, err
	}

	res := make([]dto.JobResponse, len(jobs))
	for i, j := range jobs {
		res[i] = *s.mapToResponse(&j)
	}

	return res, total, nil
}

func (s *JobService) ListCompanyJobs(userID uuid.UUID, query dto.PaginationQuery) ([]dto.JobResponse, int64, error) {
	company, err := s.companyRepo.FindByUserID(userID)
	if err != nil {
		return nil, 0, err
	}

	query.Validate()
	jobs, total, err := s.jobRepo.ListByCompany(company.ID, query)
	if err != nil {
		return nil, 0, err
	}

	res := make([]dto.JobResponse, len(jobs))
	for i, j := range jobs {
		res[i] = *s.mapToResponse(&j)
	}

	return res, total, nil
}

func (s *JobService) UpdateJob(userID uuid.UUID, jobID uuid.UUID, req dto.UpdateJobRequest) (*dto.JobResponse, error) {
	job, err := s.jobRepo.FindByID(jobID)
	if err != nil {
		return nil, err
	}

	// Verify ownership
	company, _ := s.companyRepo.FindByUserID(userID)
	if job.CompanyID != company.ID {
		return nil, errors.New("unauthorized")
	}

	if req.Title != nil {
		job.Title = *req.Title
	}
	if req.Description != nil {
		job.Description = *req.Description
	}
	if req.Requirements != nil {
		job.Requirements = req.Requirements
	}
	if req.Location != nil {
		job.Location = req.Location
	}
	if req.SalaryMin != nil {
		job.SalaryMin = req.SalaryMin
	}
	if req.SalaryMax != nil {
		job.SalaryMax = req.SalaryMax
	}
	if req.SkillsRequired != nil {
		job.SkillsRequired = req.SkillsRequired
	}
	if req.Status != nil {
		job.Status = *req.Status
	}
	if req.Deadline != nil {
		d, _ := time.Parse("2006-01-02", *req.Deadline)
		job.Deadline = &d
	}
	if req.Slots != nil {
		job.Slots = *req.Slots
	}

	if err := s.jobRepo.Update(job); err != nil {
		return nil, err
	}

	return s.mapToResponse(job), nil
}

func (s *JobService) DeleteJob(userID uuid.UUID, jobID uuid.UUID) error {
	job, err := s.jobRepo.FindByID(jobID)
	if err != nil {
		return err
	}

	company, _ := s.companyRepo.FindByUserID(userID)
	if job.CompanyID != company.ID {
		return errors.New("unauthorized")
	}

	// Logic to check for active contracts before deleting
	// For now, simple delete
	return s.jobRepo.Delete(jobID)
}

func (s *JobService) getMaxJobs(plan string) int {
	switch plan {
	case "free":
		return 1
	case "basic":
		return 5
	case "pro":
		return 20
	case "enterprise":
		return -1 // Unlimited
	default:
		return 1
	}
}

func (s *JobService) mapToResponse(job *model.Job) *dto.JobResponse {
	var deadline *string
	if job.Deadline != nil {
		d := job.Deadline.Format("2006-01-02")
		deadline = &d
	}

	return &dto.JobResponse{
		ID:             job.ID.String(),
		CompanyID:      job.CompanyID.String(),
		CompanyName:    job.Company.CompanyName,
		CompanyLogo:    job.Company.LogoURL,
		Title:          job.Title,
		Description:    job.Description,
		Requirements:   job.Requirements,
		Location:       job.Location,
		JobType:        job.JobType,
		SalaryMin:      job.SalaryMin,
		SalaryMax:      job.SalaryMax,
		SkillsRequired: job.SkillsRequired,
		Status:         job.Status,
		Deadline:       deadline,
		Slots:          job.Slots,
		CreatedAt:      job.CreatedAt,
	}
}
