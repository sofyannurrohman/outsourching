package model

import (
	"time"

	"github.com/google/uuid"
	"github.com/lib/pq"
	"gorm.io/gorm"
)

type Talent struct {
	ID              uuid.UUID      `gorm:"type:uuid;default:uuid_generate_v4();primaryKey" json:"id"`
	UserID          uuid.UUID      `gorm:"type:uuid;uniqueIndex;not null" json:"user_id"`
	FullName        string         `gorm:"type:varchar(255);not null" json:"full_name"`
	Phone           *string        `gorm:"type:varchar(20)" json:"phone,omitempty"`
	BirthDate       *time.Time     `gorm:"type:date" json:"birth_date,omitempty"`
	Gender          *string        `gorm:"type:gender_type" json:"gender,omitempty"`
	Address         *string        `gorm:"type:text" json:"address,omitempty"`
	City            *string        `gorm:"type:varchar(100)" json:"city,omitempty"`
	Province        *string        `gorm:"type:varchar(100)" json:"province,omitempty"`
	AvatarURL       *string        `gorm:"type:text" json:"avatar_url,omitempty"`
	CVURL           *string        `gorm:"type:text" json:"cv_url,omitempty"`
	PortfolioURL    *string        `gorm:"type:text" json:"portfolio_url,omitempty"`
	LinkedinURL     *string        `gorm:"type:text" json:"linkedin_url,omitempty"`
	Summary         *string        `gorm:"type:text" json:"summary,omitempty"`
	CurrentJobTitle *string        `gorm:"type:varchar(255)" json:"current_job_title,omitempty"`
	ExpectedSalary  *int64         `gorm:"type:bigint" json:"expected_salary,omitempty"`
	WorkType        *string        `gorm:"type:work_type" json:"preferred_work_type,omitempty"`
	Availability    *string        `gorm:"type:availability_type" json:"availability_status,omitempty"`
	AvailableFrom   *time.Time     `gorm:"type:date" json:"available_start_date,omitempty"`
	Skills          pq.StringArray `gorm:"type:text[];default:'{}'" json:"skills"`
	ExperienceYears int            `gorm:"default:0" json:"experience_years"`
	InternalScore   int            `gorm:"default:0" json:"internal_score"`
	PoolStatus      string         `gorm:"type:pool_status;default:'pending'" json:"pool_status"`
	ApprovedBy      *uuid.UUID     `gorm:"type:uuid" json:"approved_by,omitempty"`
	ApprovedAt      *time.Time     `json:"approved_at,omitempty"`
	CreatedAt       time.Time      `gorm:"autoCreateTime" json:"created_at"`
	UpdatedAt       time.Time      `gorm:"autoUpdateTime" json:"updated_at"`
	DeletedAt       gorm.DeletedAt `gorm:"index" json:"-"`

	// Relations
	User        User               `gorm:"foreignKey:UserID" json:"user,omitempty"`
	Experiences []TalentExperience `gorm:"foreignKey:TalentID" json:"experiences,omitempty"`
	Educations  []TalentEducation  `gorm:"foreignKey:TalentID" json:"educations,omitempty"`
	TalentSkills []TalentSkill     `gorm:"foreignKey:TalentID" json:"talent_skills,omitempty"`
}

func (Talent) TableName() string {
	return "talents"
}
