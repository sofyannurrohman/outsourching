package repo

import (
	"github.com/google/uuid"
	"github.com/outsourcehub/backend/internal/dto"
	"github.com/outsourcehub/backend/internal/model"
	"gorm.io/gorm"
)

type JobRepo struct {
	db *gorm.DB
}

func NewJobRepo(db *gorm.DB) *JobRepo {
	return &JobRepo{db: db}
}

func (r *JobRepo) Create(job *model.Job) error {
	return r.db.Create(job).Error
}

func (r *JobRepo) FindByID(id uuid.UUID) (*model.Job, error) {
	var job model.Job
	err := r.db.Preload("Company").Where("id = ?", id).First(&job).Error
	if err != nil {
		return nil, err
	}
	return &job, nil
}

func (r *JobRepo) Update(job *model.Job) error {
	return r.db.Save(job).Error
}

func (r *JobRepo) Delete(id uuid.UUID) error {
	return r.db.Where("id = ?", id).Delete(&model.Job{}).Error
}

func (r *JobRepo) ListByCompany(companyID uuid.UUID, query dto.PaginationQuery) ([]model.Job, int64, error) {
	var jobs []model.Job
	var total int64

	db := r.db.Model(&model.Job{}).Where("company_id = ?", companyID)

	if query.Status != "" {
		db = db.Where("status = ?", query.Status)
	}
	if query.Search != "" {
		db = db.Where("title ILIKE ?", "%"+query.Search+"%")
	}

	db.Count(&total)

	err := db.Order(query.Sort + " " + query.Order).
		Offset(query.Offset()).
		Limit(query.Limit).
		Find(&jobs).Error

	return jobs, total, err
}

func (r *JobRepo) ListPublic(query dto.PaginationQuery) ([]model.Job, int64, error) {
	var jobs []model.Job
	var total int64

	db := r.db.Model(&model.Job{}).Preload("Company").Where("status = ?", "open")

	if query.Search != "" {
		db = db.Where("title ILIKE ? OR description ILIKE ?", "%"+query.Search+"%", "%"+query.Search+"%")
	}
	if query.Skill != "" {
		db = db.Where("? = ANY(skills_required)", query.Skill)
	}

	db.Count(&total)

	err := db.Order(query.Sort + " " + query.Order).
		Offset(query.Offset()).
		Limit(query.Limit).
		Find(&jobs).Error

	return jobs, total, err
}

func (r *JobRepo) ListAll(query dto.PaginationQuery) ([]model.Job, int64, error) {
	var jobs []model.Job
	var total int64

	db := r.db.Model(&model.Job{}).Preload("Company")

	if query.Status != "" {
		db = db.Where("status = ?", query.Status)
	}
	if query.Search != "" {
		db = db.Where("title ILIKE ?", "%"+query.Search+"%")
	}

	db.Count(&total)

	err := db.Order(query.Sort + " " + query.Order).
		Offset(query.Offset()).
		Limit(query.Limit).
		Find(&jobs).Error

	return jobs, total, err
}

func (r *JobRepo) CountByCompany(companyID uuid.UUID, status string) (int64, error) {
	var count int64
	db := r.db.Model(&model.Job{}).Where("company_id = ?", companyID)
	if status != "" {
		db = db.Where("status = ?", status)
	}
	err := db.Count(&count).Error
	return count, err
}
