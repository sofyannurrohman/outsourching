package repo

import (
	"fmt"
	"time"

	"github.com/google/uuid"
	"github.com/outsourcehub/backend/internal/dto"
	"github.com/outsourcehub/backend/internal/model"
	"gorm.io/gorm"
)

type ContractRepo struct {
	db *gorm.DB
}

func NewContractRepo(db *gorm.DB) *ContractRepo {
	return &ContractRepo{db: db}
}

func (r *ContractRepo) Create(contract *model.Contract) error {
	// Generate contract number
	year := time.Now().Year()
	var count int64
	r.db.Model(&model.Contract{}).
		Where("EXTRACT(YEAR FROM created_at) = ?", year).
		Count(&count)

	contract.ContractNumber = fmt.Sprintf("CTR-%d-%04d", year, count+1)

	return r.db.Create(contract).Error
}

func (r *ContractRepo) FindByID(id uuid.UUID) (*model.Contract, error) {
	var contract model.Contract
	err := r.db.Preload("Company.User").Preload("Talent.User").Preload("Job").
		Where("id = ?", id).First(&contract).Error
	if err != nil {
		return nil, err
	}
	return &contract, nil
}

func (r *ContractRepo) Update(contract *model.Contract) error {
	return r.db.Save(contract).Error
}

func (r *ContractRepo) ListByCompany(companyID uuid.UUID, query dto.PaginationQuery) ([]model.Contract, int64, error) {
	var contracts []model.Contract
	var total int64

	db := r.db.Model(&model.Contract{}).Preload("Talent.User").Where("company_id = ?", companyID)

	if query.Status != "" {
		db = db.Where("status = ?", query.Status)
	}

	db.Count(&total)

	err := db.Order(query.Sort + " " + query.Order).
		Offset(query.Offset()).
		Limit(query.Limit).
		Find(&contracts).Error

	return contracts, total, err
}

func (r *ContractRepo) ListByTalent(talentID uuid.UUID, query dto.PaginationQuery) ([]model.Contract, int64, error) {
	var contracts []model.Contract
	var total int64

	db := r.db.Model(&model.Contract{}).Preload("Company.User").Where("talent_id = ?", talentID)

	if query.Status != "" {
		db = db.Where("status = ?", query.Status)
	}

	db.Count(&total)

	err := db.Order(query.Sort + " " + query.Order).
		Offset(query.Offset()).
		Limit(query.Limit).
		Find(&contracts).Error

	return contracts, total, err
}

func (r *ContractRepo) ListAll(query dto.PaginationQuery) ([]model.Contract, int64, error) {
	var contracts []model.Contract
	var total int64

	db := r.db.Model(&model.Contract{}).Preload("Company.User").Preload("Talent.User")

	if query.Status != "" {
		db = db.Where("status = ?", query.Status)
	}

	db.Count(&total)

	err := db.Order(query.Sort + " " + query.Order).
		Offset(query.Offset()).
		Limit(query.Limit).
		Find(&contracts).Error

	return contracts, total, err
}

func (r *ContractRepo) CountActive() (int64, error) {
	var count int64
	err := r.db.Model(&model.Contract{}).Where("status = ?", "active").Count(&count).Error
	return count, err
}

func (r *ContractRepo) TotalRevenue() (float64, error) {
	var result struct {
		Total float64
	}
	err := r.db.Model(&model.Contract{}).
		Where("status IN ?", []string{"active", "completed"}).
		Select("COALESCE(SUM(monthly_rate * platform_fee_pct / 100), 0) as total").
		Scan(&result).Error
	return result.Total, err
}
