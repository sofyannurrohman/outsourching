package repo

import (
	"github.com/google/uuid"
	"github.com/outsourcehub/backend/internal/dto"
	"github.com/outsourcehub/backend/internal/model"
	"gorm.io/gorm"
)

type TalentRepo struct {
	db *gorm.DB
}

func NewTalentRepo(db *gorm.DB) *TalentRepo {
	return &TalentRepo{db: db}
}

func (r *TalentRepo) Create(talent *model.Talent) error {
	return r.db.Create(talent).Error
}

func (r *TalentRepo) FindByUserID(userID uuid.UUID) (*model.Talent, error) {
	var talent model.Talent
	err := r.db.Preload("User").Where("user_id = ?", userID).First(&talent).Error
	if err != nil {
		return nil, err
	}
	return &talent, nil
}

func (r *TalentRepo) FindByID(id uuid.UUID) (*model.Talent, error) {
	var talent model.Talent
	err := r.db.Preload("User").Where("id = ?", id).First(&talent).Error
	if err != nil {
		return nil, err
	}
	return &talent, nil
}

func (r *TalentRepo) Update(talent *model.Talent) error {
	return r.db.Save(talent).Error
}

func (r *TalentRepo) List(query dto.PaginationQuery) ([]model.Talent, int64, error) {
	var talents []model.Talent
	var total int64

	db := r.db.Model(&model.Talent{}).Preload("User")

	if query.Status != "" {
		db = db.Where("pool_status = ?", query.Status)
	}
	if query.Search != "" {
		db = db.Where("full_name ILIKE ?", "%"+query.Search+"%")
	}
	if query.Skill != "" {
		db = db.Where("? = ANY(skills)", query.Skill)
	}

	db.Count(&total)

	err := db.Order(query.Sort + " " + query.Order).
		Offset(query.Offset()).
		Limit(query.Limit).
		Find(&talents).Error

	return talents, total, err
}

func (r *TalentRepo) FindActiveBySkills(skills []string) ([]model.Talent, error) {
	var talents []model.Talent
	db := r.db.Where("pool_status = ?", "active")

	for _, skill := range skills {
		db = db.Where("? = ANY(skills)", skill)
	}

	err := db.Preload("User").Find(&talents).Error
	return talents, err
}
