package model

import (
	"time"

	"github.com/google/uuid"
)

type Skill struct {
	ID        uuid.UUID `gorm:"type:uuid;default:uuid_generate_v4();primaryKey" json:"id"`
	Name      string    `gorm:"type:varchar(100);unique;not null" json:"name"`
	CreatedAt time.Time `gorm:"autoCreateTime" json:"created_at"`
	UpdatedAt time.Time `gorm:"autoUpdateTime" json:"updated_at"`
}

func (Skill) TableName() string {
	return "skills"
}

type TalentSkill struct {
	TalentID        uuid.UUID `gorm:"primaryKey" json:"talent_id"`
	SkillID         uuid.UUID `gorm:"primaryKey" json:"skill_id"`
	Level           string    `gorm:"type:varchar(20)" json:"level"` // beginner, intermediate, expert
	YearsExperience int       `gorm:"default:0" json:"years_experience"`

	// Relations
	Skill Skill `gorm:"foreignKey:SkillID" json:"skill,omitempty"`
}

func (TalentSkill) TableName() string {
	return "talent_skills"
}
