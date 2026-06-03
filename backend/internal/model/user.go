package model

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type User struct {
	ID            uuid.UUID      `gorm:"type:uuid;default:uuid_generate_v4();primaryKey" json:"id"`
	Email         string         `gorm:"type:varchar(255);uniqueIndex;not null" json:"email"`
	PasswordHash  string         `gorm:"type:text;not null" json:"-"`
	Role          string         `gorm:"type:user_role;not null" json:"role"`
	Status        string         `gorm:"type:user_status;default:'active'" json:"status"`
	IsActive      bool           `gorm:"default:true" json:"is_active"`
	EmailVerified bool           `gorm:"default:false" json:"email_verified"`
	LastLogin     *time.Time     `json:"last_login,omitempty"`
	CreatedAt     time.Time      `gorm:"autoCreateTime" json:"created_at"`
	UpdatedAt     time.Time      `gorm:"autoUpdateTime" json:"updated_at"`
	DeletedAt     gorm.DeletedAt `gorm:"index" json:"-"`
}

func (User) TableName() string {
	return "users"
}
