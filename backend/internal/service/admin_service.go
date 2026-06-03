package service

import (
	"errors"

	"github.com/google/uuid"
	"github.com/outsourcehub/backend/internal/dto"
	"github.com/outsourcehub/backend/internal/model"
	"github.com/outsourcehub/backend/internal/repo"
)

type AdminService struct {
	talentRepo   *repo.TalentRepo
	companyRepo  *repo.CompanyRepo
	jobRepo      *repo.JobRepo
	contractRepo *repo.ContractRepo
}

func NewAdminService(
	talentRepo *repo.TalentRepo,
	companyRepo *repo.CompanyRepo,
	jobRepo *repo.JobRepo,
	contractRepo *repo.ContractRepo,
) *AdminService {
	return &AdminService{
		talentRepo:   talentRepo,
		companyRepo:  companyRepo,
		jobRepo:      jobRepo,
		contractRepo: contractRepo,
	}
}

func (s *AdminService) GetDashboardStats() (*dto.AdminDashboardStats, error) {
	// Simple count aggregations. In a real app, these might be cached or use dedicated analytics queries.
	_, totalTalents, _ := s.talentRepo.List(dto.PaginationQuery{Limit: 1})
	_, activeTalents, _ := s.talentRepo.List(dto.PaginationQuery{Limit: 1, Status: "active"})
	_, totalCompanies, _ := s.companyRepo.List(dto.PaginationQuery{Limit: 1})
	_, verifiedCompanies, _ := s.companyRepo.List(dto.PaginationQuery{Limit: 1, Status: "active"}) // Assuming 'active' means verified
	_, activeJobs, _ := s.jobRepo.ListAll(dto.PaginationQuery{Limit: 1, Status: "open"})
	activeContracts, _ := s.contractRepo.CountActive()
	totalRevenue, _ := s.contractRepo.TotalRevenue()

	return &dto.AdminDashboardStats{
		TotalTalents:      totalTalents,
		ActiveTalents:     activeTalents,
		TotalCompanies:    totalCompanies,
		VerifiedCompanies: verifiedCompanies,
		ActiveJobs:        activeJobs,
		ActiveContracts:   activeContracts,
		MonthlyRevenue:    totalRevenue / 12, // Placeholder for actual monthly calculation
		TotalRevenue:      totalRevenue,
	}, nil
}

func (s *AdminService) UpdateTalentStatus(talentID uuid.UUID, req dto.VerifyProfileRequest) error {
	talent, err := s.talentRepo.FindByID(talentID)
	if err != nil {
		return errors.New("talent not found")
	}

	talent.PoolStatus = req.Status
	// We could also store admin notes if we added a field to the model
	
	return s.talentRepo.Update(talent)
}

func (s *AdminService) UpdateCompanyStatus(companyID uuid.UUID, req dto.VerifyProfileRequest) error {
	company, err := s.companyRepo.FindByID(companyID)
	if err != nil {
		return errors.New("company not found")
	}

	// Assuming we use 'verified' as a status
	if req.Status == "active" {
		company.IsVerified = true
	} else if req.Status == "suspended" {
		company.IsVerified = false
	}
	
	return s.companyRepo.Update(company)
}

func (s *AdminService) ListTalents(query dto.PaginationQuery) ([]model.Talent, int64, error) {
	query.Validate()
	return s.talentRepo.List(query)
}

func (s *AdminService) ListCompanies(query dto.PaginationQuery) ([]model.Company, int64, error) {
	query.Validate()
	return s.companyRepo.List(query)
}

func (s *AdminService) CreateContract(req dto.CreateContractRequest) (*model.Contract, error) {
	jobID, _ := uuid.Parse(req.JobID)
	talentID, _ := uuid.Parse(req.TalentID)
	companyID, _ := uuid.Parse(req.CompanyID)

	contract := &model.Contract{
		JobID:           &jobID,
		TalentID:        talentID,
		CompanyID:       companyID,
		MonthlyRate:     req.MonthlyRate,
		PlatformFeePct:  req.PlatformFee,
		StartDate:       req.StartDate,
		EndDate:         &req.EndDate,
		Status:          "active",
	}

	if err := s.contractRepo.Create(contract); err != nil {
		return nil, err
	}

	return contract, nil
}
