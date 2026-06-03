package service

import (
	"time"

	"github.com/google/uuid"

	"github.com/outsourcehub/backend/internal/dto"
	"github.com/outsourcehub/backend/internal/model"
	"github.com/outsourcehub/backend/internal/repo"
)

type TalentService struct {
	repo        *repo.TalentRepo
	fileService *FileService
}

func NewTalentService(repo *repo.TalentRepo, fileService *FileService) *TalentService {
	return &TalentService{repo: repo, fileService: fileService}
}

func (s *TalentService) GetProfile(userID uuid.UUID) (*dto.TalentResponse, error) {
	talent, err := s.repo.FindByUserID(userID)
	if err != nil {
		return nil, err
	}

	return s.mapToResponse(talent), nil
}

func (s *TalentService) UpdateProfile(userID uuid.UUID, req dto.UpdateTalentProfileRequest) (*dto.TalentResponse, error) {
	talent, err := s.repo.FindByUserID(userID)
	if err != nil {
		return nil, err
	}

	if req.FullName != nil {
		talent.FullName = *req.FullName
	}
	if req.Phone != nil {
		talent.Phone = req.Phone
	}
	if req.BirthDate != nil {
		t, err := time.Parse("2006-01-02", *req.BirthDate)
		if err == nil {
			talent.BirthDate = &t
		}
	}
	if req.Gender != nil {
		talent.Gender = req.Gender
	}
	if req.Address != nil {
		talent.Address = req.Address
	}
	if req.Summary != nil {
		talent.Summary = req.Summary
	}
	if req.Skills != nil {
		talent.Skills = req.Skills
	}
	if req.ExperienceYears != nil {
		talent.ExperienceYears = *req.ExperienceYears
	}

	if err := s.repo.Update(talent); err != nil {
		return nil, err
	}

	return s.mapToResponse(talent), nil
}

func (s *TalentService) UploadAvatar(userID uuid.UUID, file dto.FileUpload) (string, error) {
	if err := s.fileService.ValidateFileType(file.Filename, []string{".jpg", ".jpeg", ".png"}); err != nil {
		return "", err
	}
	if err := s.fileService.ValidateFileSize(file.Size); err != nil {
		return "", err
	}

	url, err := s.fileService.UploadFile(file.Reader, file.Filename, "avatars")
	if err != nil {
		return "", err
	}

	talent, err := s.repo.FindByUserID(userID)
	if err != nil {
		return "", err
	}

	talent.AvatarURL = &url
	if err := s.repo.Update(talent); err != nil {
		return "", err
	}

	return url, nil
}

func (s *TalentService) UploadCV(userID uuid.UUID, file dto.FileUpload) (string, error) {
	if err := s.fileService.ValidateFileType(file.Filename, []string{".pdf", ".docx"}); err != nil {
		return "", err
	}
	if err := s.fileService.ValidateFileSize(file.Size); err != nil {
		return "", err
	}

	url, err := s.fileService.UploadFile(file.Reader, file.Filename, "cvs")
	if err != nil {
		return "", err
	}

	talent, err := s.repo.FindByUserID(userID)
	if err != nil {
		return "", err
	}

	talent.CVURL = &url
	if err := s.repo.Update(talent); err != nil {
		return "", err
	}

	return url, nil
}

func (s *TalentService) mapToResponse(talent *model.Talent) *dto.TalentResponse {
	var birthDate *string
	if talent.BirthDate != nil {
		bd := talent.BirthDate.Format("2006-01-02")
		birthDate = &bd
	}

	return &dto.TalentResponse{
		ID:              talent.ID.String(),
		UserID:          talent.UserID.String(),
		Email:           talent.User.Email,
		FullName:        talent.FullName,
		Phone:           talent.Phone,
		BirthDate:       birthDate,
		Gender:          talent.Gender,
		Address:         talent.Address,
		AvatarURL:       talent.AvatarURL,
		CVURL:           talent.CVURL,
		Summary:         talent.Summary,
		Skills:          talent.Skills,
		ExperienceYears: talent.ExperienceYears,
		PoolStatus:      talent.PoolStatus,
		CreatedAt:       talent.CreatedAt,
	}
}
