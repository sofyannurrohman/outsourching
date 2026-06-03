package model

import (
	"time"

	"github.com/google/uuid"
)

type TalentEducation struct {
	ID          uuid.UUID `gorm:"type:uuid;default:uuid_generate_v4();primaryKey" json:"id"`
	TalentID    uuid.UUID `gorm:"type:uuid;not null" json:"talent_id"`
	Institution string    `gorm:"type:varchar(255);not null" json:"institution"`
	Major       string    `gorm:"type:varchar(255)" json:"major"`
	Degree      string    `gorm:"type:varchar(100)" json:"degree"`
	StartYear   int       `json:"start_year"`
	EndYear     int       `json:"end_year"`
	CreatedAt   time.Time `gorm:"autoCreateTime" json:"created_at"`
	UpdatedAt   time.Time `gorm:"autoUpdateTime" json:"updated_at"`
}

func (TalentEducation) TableName() string {
	return "talent_educations"
}
