package service

import (
	"fmt"
	"log"

	"github.com/outsourcehub/backend/internal/config"
	"github.com/outsourcehub/backend/internal/model"
)

type NotificationService struct {
	cfg *config.Config
}

func NewNotificationService(cfg *config.Config) *NotificationService {
	return &NotificationService{cfg: cfg}
}

// NotifyStatusChange alerts the talent when their application status is updated by a company.
func (s *NotificationService) NotifyStatusChange(app *model.Application, talentEmail string) error {
	subject := fmt.Sprintf("Mission Update: Your application is now %s", app.Status)
	body := fmt.Sprintf("Hello,\n\nYour application for the position has been updated to: %s.\n\nNote from Hiring Manager: %s\n\nBest regards,\nOutsourceHub Team", 
		app.Status, 
		getNote(app.AdminNote),
	)

	// In production, this would call an SMTP client or a mailing API (SendGrid/Mailgun)
	// For now, we simulate by logging to the console/system logs.
	log.Printf("[NOTIFICATION SERVER] Sending Email to %s\nSubject: %s\nBody: %s\n", talentEmail, subject, body)
	
	return nil
}

// NotifyNewApplication alerts the company when a new talent applies to their job.
func (s *NotificationService) NotifyNewApplication(app *model.Application, companyEmail string) error {
	subject := "New Mission Intelligence: Candidate Applied"
	body := "Hello,\n\nA new elite candidate has applied for your vacancy. Please review their profile in your dashboard."

	log.Printf("[NOTIFICATION SERVER] Sending Email to %s\nSubject: %s\nBody: %s\n", companyEmail, subject, body)
	
	return nil
}

func getNote(note *string) string {
	if note == nil {
		return "No additional notes provided."
	}
	return *note
}
