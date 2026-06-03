package model

import (
	"time"

	"github.com/google/uuid"
	"github.com/lib/pq"
	"gorm.io/gorm"
)

type TalentPoolRequest struct {
	ID             uuid.UUID      `gorm:"type:uuid;default:uuid_generate_v4();primaryKey" json:"id"`
	CompanyID      uuid.UUID      `gorm:"type:uuid;not null" json:"company_id"`
	SkillsNeeded   pq.StringArray `gorm:"type:text[];default:'{}'" json:"skills_needed"`
	Headcount      int            `gorm:"not null;default:1" json:"headcount"`
	Description    *string        `gorm:"type:text" json:"description,omitempty"`
	Status         string         `gorm:"type:pool_request_status;default:'open'" json:"status"`
	MatchedTalents pq.StringArray `gorm:"type:uuid[];default:'{}'" json:"matched_talents"`
	CreatedAt      time.Time      `gorm:"autoCreateTime" json:"created_at"`
	UpdatedAt      time.Time      `gorm:"autoUpdateTime" json:"updated_at"`
	DeletedAt      gorm.DeletedAt `gorm:"index" json:"-"`

	// Relations
	Company Company `gorm:"foreignKey:CompanyID" json:"company,omitempty"`
}

func (TalentPoolRequest) TableName() string {
	return "talent_pool_requests"
}
