package model

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Contract struct {
	ID             uuid.UUID      `gorm:"type:uuid;default:uuid_generate_v4();primaryKey" json:"id"`
	CompanyID      uuid.UUID      `gorm:"type:uuid;not null" json:"company_id"`
	TalentID       uuid.UUID      `gorm:"type:uuid;not null" json:"talent_id"`
	JobID          *uuid.UUID     `gorm:"type:uuid" json:"job_id,omitempty"`
	ContractNumber string         `gorm:"type:varchar(50);uniqueIndex;not null" json:"contract_number"`
	StartDate      time.Time      `gorm:"type:date;not null" json:"start_date"`
	EndDate        *time.Time     `gorm:"type:date" json:"end_date,omitempty"`
	MonthlyRate    int64          `gorm:"type:bigint;not null" json:"monthly_rate"`
	PlatformFeePct float64        `gorm:"type:decimal(5,2);default:10.00" json:"platform_fee_pct"`
	Status         string         `gorm:"type:contract_status;default:'draft'" json:"status"`
	SignedAt       *time.Time     `json:"signed_at,omitempty"`
	CreatedBy      uuid.UUID      `gorm:"type:uuid;not null" json:"created_by"`
	CreatedAt      time.Time      `gorm:"autoCreateTime" json:"created_at"`
	UpdatedAt      time.Time      `gorm:"autoUpdateTime" json:"updated_at"`
	DeletedAt      gorm.DeletedAt `gorm:"index" json:"-"`

	// Relations
	Company Company `gorm:"foreignKey:CompanyID" json:"company,omitempty"`
	Talent  Talent  `gorm:"foreignKey:TalentID" json:"talent,omitempty"`
	Job     *Job    `gorm:"foreignKey:JobID" json:"job,omitempty"`
}

func (Contract) TableName() string {
	return "contracts"
}
