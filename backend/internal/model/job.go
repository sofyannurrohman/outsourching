package model

import (
	"time"

	"github.com/google/uuid"
	"github.com/lib/pq"
	"gorm.io/gorm"
)

type Job struct {
	ID             uuid.UUID      `gorm:"type:uuid;default:uuid_generate_v4();primaryKey" json:"id"`
	CompanyID      uuid.UUID      `gorm:"type:uuid;not null" json:"company_id"`
	Title          string         `gorm:"type:varchar(255);not null" json:"title"`
	Description    string         `gorm:"type:text;not null" json:"description"`
	Requirements   *string        `gorm:"type:text" json:"requirements,omitempty"`
	Location       *string        `gorm:"type:varchar(255)" json:"location,omitempty"`
	JobType        string         `gorm:"type:job_type;not null" json:"job_type"`
	SalaryMin      *int64         `gorm:"type:bigint" json:"salary_min,omitempty"`
	SalaryMax      *int64         `gorm:"type:bigint" json:"salary_max,omitempty"`
	SkillsRequired pq.StringArray `gorm:"type:text[];default:'{}'" json:"skills_required"`
	Status         string         `gorm:"type:job_status;default:'draft'" json:"status"`
	Deadline       *time.Time     `gorm:"type:date" json:"deadline,omitempty"`
	Slots          int            `gorm:"default:1" json:"slots"`
	CreatedBy      uuid.UUID      `gorm:"type:uuid;not null" json:"created_by"`
	CreatedAt      time.Time      `gorm:"autoCreateTime" json:"created_at"`
	UpdatedAt      time.Time      `gorm:"autoUpdateTime" json:"updated_at"`
	DeletedAt      gorm.DeletedAt `gorm:"index" json:"-"`

	// Relations
	Company      Company       `gorm:"foreignKey:CompanyID" json:"company,omitempty"`
	Applications []Application `gorm:"foreignKey:JobID" json:"applications,omitempty"`
}

func (Job) TableName() string {
	return "jobs"
}
