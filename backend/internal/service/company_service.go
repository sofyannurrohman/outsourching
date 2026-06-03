package service

import (
	"github.com/google/uuid"

	"github.com/outsourcehub/backend/internal/dto"
	"github.com/outsourcehub/backend/internal/model"
	"github.com/outsourcehub/backend/internal/repo"
)

type CompanyService struct {
	repo        *repo.CompanyRepo
	fileService *FileService
}

func NewCompanyService(repo *repo.CompanyRepo, fileService *FileService) *CompanyService {
	return &CompanyService{repo: repo, fileService: fileService}
}

func (s *CompanyService) GetProfile(userID uuid.UUID) (*dto.CompanyResponse, error) {
	company, err := s.repo.FindByUserID(userID)
	if err != nil {
		return nil, err
	}

	return s.mapToResponse(company), nil
}

func (s *CompanyService) UpdateProfile(userID uuid.UUID, req dto.UpdateCompanyProfileRequest) (*dto.CompanyResponse, error) {
	company, err := s.repo.FindByUserID(userID)
	if err != nil {
		return nil, err
	}

	if req.CompanyName != nil {
		company.CompanyName = *req.CompanyName
	}
	if req.Industry != nil {
		company.Industry = req.Industry
	}
	if req.CompanySize != nil {
		company.CompanySize = req.CompanySize
	}
	if req.Website != nil {
		company.Website = req.Website
	}
	if req.Description != nil {
		company.Description = req.Description
	}
	if req.Address != nil {
		company.Address = req.Address
	}
	if req.NPWP != nil {
		company.NPWP = req.NPWP
	}

	if err := s.repo.Update(company); err != nil {
		return nil, err
	}

	return s.mapToResponse(company), nil
}

func (s *CompanyService) UploadLogo(userID uuid.UUID, file dto.FileUpload) (string, error) {
	if err := s.fileService.ValidateFileType(file.Filename, []string{".jpg", ".jpeg", ".png"}); err != nil {
		return "", err
	}
	if err := s.fileService.ValidateFileSize(file.Size); err != nil {
		return "", err
	}

	url, err := s.fileService.UploadFile(file.Reader, file.Filename, "logos")
	if err != nil {
		return "", err
	}

	company, err := s.repo.FindByUserID(userID)
	if err != nil {
		return "", err
	}

	company.LogoURL = &url
	if err := s.repo.Update(company); err != nil {
		return "", err
	}

	return url, nil
}

func (s *CompanyService) mapToResponse(company *model.Company) *dto.CompanyResponse {
	return &dto.CompanyResponse{
		ID:                    company.ID.String(),
		UserID:                company.UserID.String(),
		Email:                 company.User.Email,
		CompanyName:           company.CompanyName,
		Industry:              company.Industry,
		CompanySize:           company.CompanySize,
		Website:               company.Website,
		LogoURL:               company.LogoURL,
		Description:           company.Description,
		Address:               company.Address,
		NPWP:                  company.NPWP,
		SubscriptionPlan:      company.SubscriptionPlan,
		SubscriptionExpiresAt: company.SubscriptionExpiresAt,
		IsVerified:            company.IsVerified,
		CreatedAt:             company.CreatedAt,
	}
}
