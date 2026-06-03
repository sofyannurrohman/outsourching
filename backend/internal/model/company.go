package model

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Company struct {
	ID                    uuid.UUID      `gorm:"type:uuid;default:uuid_generate_v4();primaryKey" json:"id"`
	UserID                uuid.UUID      `gorm:"type:uuid;uniqueIndex;not null" json:"user_id"`
	CompanyName           string         `gorm:"type:varchar(255);not null" json:"company_name"`
	Industry              *string        `gorm:"type:varchar(100)" json:"industry,omitempty"`
	CompanySize           *string        `gorm:"type:company_size" json:"company_size,omitempty"`
	Website               *string        `gorm:"type:text" json:"website,omitempty"`
	LogoURL               *string        `gorm:"type:text" json:"logo_url,omitempty"`
	Description           *string        `gorm:"type:text" json:"description,omitempty"`
	Address               *string        `gorm:"type:text" json:"address,omitempty"`
	NPWP                  *string        `gorm:"type:varchar(30)" json:"npwp,omitempty"`
	SubscriptionPlan      string         `gorm:"type:subscription_plan;default:'free'" json:"subscription_plan"`
	SubscriptionExpiresAt *time.Time     `json:"subscription_expires_at,omitempty"`
	IsVerified            bool           `gorm:"default:false" json:"is_verified"`
	CreatedAt             time.Time      `gorm:"autoCreateTime" json:"created_at"`
	UpdatedAt             time.Time      `gorm:"autoUpdateTime" json:"updated_at"`
	DeletedAt             gorm.DeletedAt `gorm:"index" json:"-"`

	// Relations
	User User  `gorm:"foreignKey:UserID" json:"user,omitempty"`
	Jobs []Job `gorm:"foreignKey:CompanyID" json:"jobs,omitempty"`
}

func (Company) TableName() string {
	return "companies"
}
