package repo

import (
	"github.com/google/uuid"
	"github.com/outsourcehub/backend/internal/dto"
	"github.com/outsourcehub/backend/internal/model"
	"gorm.io/gorm"
)

type CompanyRepo struct {
	db *gorm.DB
}

func NewCompanyRepo(db *gorm.DB) *CompanyRepo {
	return &CompanyRepo{db: db}
}

func (r *CompanyRepo) Create(company *model.Company) error {
	return r.db.Create(company).Error
}

func (r *CompanyRepo) FindByUserID(userID uuid.UUID) (*model.Company, error) {
	var company model.Company
	err := r.db.Preload("User").Where("user_id = ?", userID).First(&company).Error
	if err != nil {
		return nil, err
	}
	return &company, nil
}

func (r *CompanyRepo) FindByID(id uuid.UUID) (*model.Company, error) {
	var company model.Company
	err := r.db.Preload("User").Where("id = ?", id).First(&company).Error
	if err != nil {
		return nil, err
	}
	return &company, nil
}

func (r *CompanyRepo) Update(company *model.Company) error {
	return r.db.Save(company).Error
}

func (r *CompanyRepo) List(query dto.PaginationQuery) ([]model.Company, int64, error) {
	var companies []model.Company
	var total int64

	db := r.db.Model(&model.Company{}).Preload("User")

	if query.Search != "" {
		db = db.Where("company_name ILIKE ?", "%"+query.Search+"%")
	}

	db.Count(&total)

	err := db.Order(query.Sort + " " + query.Order).
		Offset(query.Offset()).
		Limit(query.Limit).
		Find(&companies).Error

	return companies, total, err
}
