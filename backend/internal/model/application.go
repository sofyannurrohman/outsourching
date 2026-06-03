package model

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Application struct {
	ID          uuid.UUID      `gorm:"type:uuid;default:uuid_generate_v4();primaryKey" json:"id"`
	JobID       uuid.UUID      `gorm:"type:uuid;not null" json:"job_id"`
	TalentID    uuid.UUID      `gorm:"type:uuid;not null" json:"talent_id"`
	CoverLetter *string        `gorm:"type:text" json:"cover_letter,omitempty"`
	Status             string         `gorm:"type:application_status;default:'pending'" json:"status"`
	AdminNote          *string        `gorm:"type:text" json:"admin_note,omitempty"`
	ScreeningQuestions map[string]interface{} `gorm:"type:jsonb;default:'{}'" json:"screening_questions"`
	TestScore          *int           `json:"test_score,omitempty"`
	InterviewNotes     *string        `gorm:"type:text" json:"interview_notes,omitempty"`
	HRRating           *int           `json:"hr_rating,omitempty"`
	FinalDecision      *string        `gorm:"type:text" json:"final_decision,omitempty"`
	ReviewedAt         *time.Time     `json:"reviewed_at,omitempty"`
	ReviewedBy         *uuid.UUID     `gorm:"type:uuid" json:"reviewed_by,omitempty"`
	CreatedAt   time.Time      `gorm:"autoCreateTime" json:"created_at"`
	UpdatedAt   time.Time      `gorm:"autoUpdateTime" json:"updated_at"`
	DeletedAt   gorm.DeletedAt `gorm:"index" json:"-"`

	// Relations
	Job    Job    `gorm:"foreignKey:JobID" json:"job,omitempty"`
	Talent Talent `gorm:"foreignKey:TalentID" json:"talent,omitempty"`
}

func (Application) TableName() string {
	return "applications"
}
