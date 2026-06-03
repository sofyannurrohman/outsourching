package repo

import (
	"github.com/outsourcehub/backend/internal/model"
	"gorm.io/gorm"
)

type SkillRepo struct {
	db *gorm.DB
}

func NewSkillRepo(db *gorm.DB) *SkillRepo {
	return &SkillRepo{db: db}
}

func (r *SkillRepo) ListAll() ([]model.Skill, error) {
	var skills []model.Skill
	err := r.db.Order("name asc").Find(&skills).Error
	return skills, err
}

func (r *SkillRepo) FindByNames(names []string) ([]model.Skill, error) {
	var skills []model.Skill
	err := r.db.Where("name IN ?", names).Find(&skills).Error
	return skills, err
}
