package model

import (
	"time"

	"github.com/google/uuid"
)

type TalentExperience struct {
	ID          uuid.UUID `gorm:"type:uuid;default:uuid_generate_v4();primaryKey" json:"id"`
	TalentID    uuid.UUID `gorm:"type:uuid;not null" json:"talent_id"`
	CompanyName string    `gorm:"type:varchar(255);not null" json:"company_name"`
	Position    string    `gorm:"type:varchar(255);not null" json:"position"`
	StartDate   time.Time `gorm:"type:date;not null" json:"start_date"`
	EndDate     *time.Time `gorm:"type:date" json:"end_date,omitempty"`
	Description string    `gorm:"type:text" json:"description"`
	CreatedAt   time.Time `gorm:"autoCreateTime" json:"created_at"`
	UpdatedAt   time.Time `gorm:"autoUpdateTime" json:"updated_at"`
}

func (TalentExperience) TableName() string {
	return "talent_experiences"
}
