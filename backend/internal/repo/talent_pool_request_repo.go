package repo

import (
	"github.com/google/uuid"
	"github.com/outsourcehub/backend/internal/dto"
	"github.com/outsourcehub/backend/internal/model"
	"gorm.io/gorm"
)

type TalentPoolRequestRepo struct {
	db *gorm.DB
}

func NewTalentPoolRequestRepo(db *gorm.DB) *TalentPoolRequestRepo {
	return &TalentPoolRequestRepo{db: db}
}

func (r *TalentPoolRequestRepo) Create(req *model.TalentPoolRequest) error {
	return r.db.Create(req).Error
}

func (r *TalentPoolRequestRepo) FindByID(id uuid.UUID) (*model.TalentPoolRequest, error) {
	var req model.TalentPoolRequest
	err := r.db.Preload("Company.User").Where("id = ?", id).First(&req).Error
	if err != nil {
		return nil, err
	}
	return &req, nil
}

func (r *TalentPoolRequestRepo) Update(req *model.TalentPoolRequest) error {
	return r.db.Save(req).Error
}

func (r *TalentPoolRequestRepo) ListByCompany(companyID uuid.UUID, query dto.PaginationQuery) ([]model.TalentPoolRequest, int64, error) {
	var reqs []model.TalentPoolRequest
	var total int64

	db := r.db.Model(&model.TalentPoolRequest{}).Where("company_id = ?", companyID)

	if query.Status != "" {
		db = db.Where("status = ?", query.Status)
	}

	db.Count(&total)

	err := db.Order(query.Sort + " " + query.Order).
		Offset(query.Offset()).
		Limit(query.Limit).
		Find(&reqs).Error

	return reqs, total, err
}

func (r *TalentPoolRequestRepo) ListAll(query dto.PaginationQuery) ([]model.TalentPoolRequest, int64, error) {
	var reqs []model.TalentPoolRequest
	var total int64

	db := r.db.Model(&model.TalentPoolRequest{}).Preload("Company.User")

	if query.Status != "" {
		db = db.Where("status = ?", query.Status)
	}

	db.Count(&total)

	err := db.Order(query.Sort + " " + query.Order).
		Offset(query.Offset()).
		Limit(query.Limit).
		Find(&reqs).Error

	return reqs, total, err
}
