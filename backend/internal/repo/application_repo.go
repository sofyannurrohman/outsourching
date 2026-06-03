package repo

import (
	"github.com/google/uuid"
	"github.com/outsourcehub/backend/internal/dto"
	"github.com/outsourcehub/backend/internal/model"
	"gorm.io/gorm"
)

type ApplicationRepo struct {
	db *gorm.DB
}

func NewApplicationRepo(db *gorm.DB) *ApplicationRepo {
	return &ApplicationRepo{db: db}
}

func (r *ApplicationRepo) DB() *gorm.DB {
	return r.db
}

func (r *ApplicationRepo) Create(app *model.Application) error {
	return r.db.Create(app).Error
}

func (r *ApplicationRepo) FindByID(id uuid.UUID) (*model.Application, error) {
	var app model.Application
	err := r.db.Preload("Job.Company").Preload("Talent.User").Where("id = ?", id).First(&app).Error
	if err != nil {
		return nil, err
	}
	return &app, nil
}

func (r *ApplicationRepo) Update(app *model.Application) error {
	return r.db.Save(app).Error
}

func (r *ApplicationRepo) ListByTalent(talentID uuid.UUID, query dto.PaginationQuery) ([]model.Application, int64, error) {
	var apps []model.Application
	var total int64

	db := r.db.Model(&model.Application{}).Preload("Job.Company").Where("talent_id = ?", talentID)

	if query.Status != "" {
		db = db.Where("status = ?", query.Status)
	}

	db.Count(&total)

	err := db.Order(query.Sort + " " + query.Order).
		Offset(query.Offset()).
		Limit(query.Limit).
		Find(&apps).Error

	return apps, total, err
}

func (r *ApplicationRepo) ListByJob(jobID uuid.UUID, query dto.PaginationQuery) ([]model.Application, int64, error) {
	var apps []model.Application
	var total int64

	db := r.db.Model(&model.Application{}).Preload("Talent.User").Where("job_id = ?", jobID)

	if query.Status != "" {
		db = db.Where("status = ?", query.Status)
	}

	db.Count(&total)

	err := db.Order(query.Sort + " " + query.Order).
		Offset(query.Offset()).
		Limit(query.Limit).
		Find(&apps).Error

	return apps, total, err
}

func (r *ApplicationRepo) ListAll(query dto.PaginationQuery) ([]model.Application, int64, error) {
	var apps []model.Application
	var total int64

	db := r.db.Model(&model.Application{}).Preload("Job.Company").Preload("Talent.User")

	if query.Status != "" {
		db = db.Where("status = ?", query.Status)
	}

	db.Count(&total)

	err := db.Order(query.Sort + " " + query.Order).
		Offset(query.Offset()).
		Limit(query.Limit).
		Find(&apps).Error

	return apps, total, err
}

func (r *ApplicationRepo) ExistsByTalentAndJob(talentID, jobID uuid.UUID) (bool, error) {
	var count int64
	err := r.db.Model(&model.Application{}).
		Where("talent_id = ? AND job_id = ?", talentID, jobID).
		Count(&count).Error
	return count > 0, err
}
