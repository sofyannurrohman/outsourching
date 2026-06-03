package dto

import "time"

// --- Talent DTOs ---

type UpdateTalentProfileRequest struct {
	FullName        *string   `json:"full_name"`
	Phone           *string   `json:"phone"`
	BirthDate       *string   `json:"birth_date"` // Format: 2006-01-02
	Gender          *string   `json:"gender"`
	Address         *string   `json:"address"`
	Summary         *string   `json:"summary"`
	Skills          []string  `json:"skills"`
	ExperienceYears *int      `json:"experience_years"`
}

type TalentResponse struct {
	ID              string    `json:"id"`
	UserID          string    `json:"user_id"`
	Email           string    `json:"email"`
	FullName        string    `json:"full_name"`
	Phone           *string   `json:"phone,omitempty"`
	BirthDate       *string   `json:"birth_date,omitempty"`
	Gender          *string   `json:"gender,omitempty"`
	Address         *string   `json:"address,omitempty"`
	AvatarURL       *string   `json:"avatar_url,omitempty"`
	CVURL           *string   `json:"cv_url,omitempty"`
	Summary         *string   `json:"summary,omitempty"`
	Skills          []string  `json:"skills"`
	ExperienceYears int       `json:"experience_years"`
	PoolStatus      string    `json:"pool_status"`
	CreatedAt       time.Time `json:"created_at"`
}

// --- Company DTOs ---

type UpdateCompanyProfileRequest struct {
	CompanyName *string `json:"company_name"`
	Industry    *string `json:"industry"`
	CompanySize *string `json:"company_size"`
	Website     *string `json:"website"`
	Description *string `json:"description"`
	Address     *string `json:"address"`
	NPWP        *string `json:"npwp"`
}

type CompanyResponse struct {
	ID                    string     `json:"id"`
	UserID                string     `json:"user_id"`
	Email                 string     `json:"email"`
	CompanyName           string     `json:"company_name"`
	Industry              *string    `json:"industry,omitempty"`
	CompanySize           *string    `json:"company_size,omitempty"`
	Website               *string    `json:"website,omitempty"`
	LogoURL               *string    `json:"logo_url,omitempty"`
	Description           *string    `json:"description,omitempty"`
	Address               *string    `json:"address,omitempty"`
	NPWP                  *string    `json:"npwp,omitempty"`
	SubscriptionPlan      string     `json:"subscription_plan"`
	SubscriptionExpiresAt *time.Time `json:"subscription_expires_at,omitempty"`
	IsVerified            bool       `json:"is_verified"`
	CreatedAt             time.Time  `json:"created_at"`
}

// --- Job DTOs ---

type CreateJobRequest struct {
	Title          string   `json:"title" binding:"required"`
	Description    string   `json:"description" binding:"required"`
	Requirements   *string  `json:"requirements"`
	Location       *string  `json:"location"`
	JobType        string   `json:"job_type" binding:"required,oneof=full-time part-time contract outsource"`
	SalaryMin      *int64   `json:"salary_min"`
	SalaryMax      *int64   `json:"salary_max"`
	SkillsRequired []string `json:"skills_required"`
	Deadline       *string  `json:"deadline"` // Format: 2006-01-02
	Slots          *int     `json:"slots"`
}

type UpdateJobRequest struct {
	Title          *string  `json:"title"`
	Description    *string  `json:"description"`
	Requirements   *string  `json:"requirements"`
	Location       *string  `json:"location"`
	JobType        *string  `json:"job_type"`
	SalaryMin      *int64   `json:"salary_min"`
	SalaryMax      *int64   `json:"salary_max"`
	SkillsRequired []string `json:"skills_required"`
	Status         *string  `json:"status"`
	Deadline       *string  `json:"deadline"`
	Slots          *int     `json:"slots"`
}

type JobResponse struct {
	ID             string    `json:"id"`
	CompanyID      string    `json:"company_id"`
	CompanyName    string    `json:"company_name"`
	CompanyLogo    *string   `json:"company_logo,omitempty"`
	Title          string    `json:"title"`
	Description    string    `json:"description"`
	Requirements   *string   `json:"requirements,omitempty"`
	Location       *string   `json:"location,omitempty"`
	JobType        string    `json:"job_type"`
	SalaryMin      *int64    `json:"salary_min,omitempty"`
	SalaryMax      *int64    `json:"salary_max,omitempty"`
	SkillsRequired []string  `json:"skills_required"`
	Status         string    `json:"status"`
	Deadline       *string   `json:"deadline,omitempty"`
	Slots          int       `json:"slots"`
	CreatedAt      time.Time `json:"created_at"`
}

// --- Application DTOs ---

type TalentSkillRequest struct {
	ID              string `json:"skill_id" binding:"required,uuid"`
	Level           string `json:"level" binding:"required,oneof=beginner intermediate expert"`
	YearsExperience int    `json:"years_experience"`
}

type TalentExperienceRequest struct {
	CompanyName string `json:"company_name" binding:"required"`
	Position    string `json:"position" binding:"required"`
	StartDate   string `json:"start_date" binding:"required"` // 2006-01-02
	EndDate     *string `json:"end_date"`
	Description string `json:"description"`
}

type TalentEducationRequest struct {
	Institution string `json:"institution" binding:"required"`
	Major       string `json:"major"`
	Degree      string `json:"degree"`
	StartYear   int    `json:"start_year"`
	EndYear     int    `json:"end_year"`
}

type ApplyJobRequest struct {
	JobID string `json:"job_id" binding:"required,uuid"`

	// Step 1: Basic Info (updates profile)
	FullName string  `json:"full_name" binding:"required"`
	Phone    *string `json:"phone"`
	Location string  `json:"location" binding:"required"` // City

	// Step 2: Professional Info (updates profile)
	CurrentJobTitle *string `json:"current_job_title"`
	YearsExperience int     `json:"experience_years"`
	ExpectedSalary  int64   `json:"expected_salary"`
	WorkType        string  `json:"preferred_work_type" binding:"required,oneof=remote onsite hybrid"`
	Availability    string  `json:"availability_status" binding:"required,oneof=available notice_period working"`
	AvailableFrom   *string `json:"available_start_date"` // 2006-01-02
	Skills          []TalentSkillRequest `json:"skills"`

	// Step 3: Additional Info
	Experiences []TalentExperienceRequest `json:"experiences"`
	Educations  []TalentEducationRequest  `json:"educations"`
	PortfolioURL *string `json:"portfolio_url"`
	LinkedinURL  *string `json:"linkedin_url"`

	// Step 4: Screening Questions
	CoverLetter        *string                `json:"cover_letter"`
	ScreeningQuestions map[string]interface{} `json:"screening_questions"`
}

type UpdateApplicationStatusRequest struct {
	Status    string  `json:"status" binding:"required,oneof=reviewed shortlisted rejected hired"`
	AdminNote *string `json:"admin_note"`
}

type ApplicationResponse struct {
	ID          string          `json:"id"`
	JobID       string          `json:"job_id"`
	TalentID    string          `json:"talent_id"`
	CoverLetter *string         `json:"cover_letter,omitempty"`
	Status      string          `json:"status"`
	AdminNote   *string         `json:"admin_note,omitempty"`
	ReviewedAt  *time.Time      `json:"reviewed_at,omitempty"`
	CreatedAt   time.Time       `json:"created_at"`
	Job         *JobResponse    `json:"job,omitempty"`
	Talent      *TalentResponse `json:"talent,omitempty"`
}

// --- Contract DTOs ---


type UpdateContractStatusRequest struct {
	Status string `json:"status" binding:"required,oneof=active completed terminated"`
}

type ContractResponse struct {
	ID             string          `json:"id"`
	CompanyID      string          `json:"company_id"`
	TalentID       string          `json:"talent_id"`
	JobID          *string         `json:"job_id,omitempty"`
	ContractNumber string          `json:"contract_number"`
	StartDate      string          `json:"start_date"`
	EndDate        *string         `json:"end_date,omitempty"`
	MonthlyRate    int64           `json:"monthly_rate"`
	PlatformFeePct float64         `json:"platform_fee_pct"`
	Status         string          `json:"status"`
	SignedAt       *time.Time      `json:"signed_at,omitempty"`
	CreatedAt      time.Time       `json:"created_at"`
	Company        *CompanyResponse `json:"company,omitempty"`
	Talent         *TalentResponse  `json:"talent,omitempty"`
}

// --- Talent Pool Request DTOs ---

type CreateTalentPoolRequestDTO struct {
	SkillsNeeded []string `json:"skills_needed" binding:"required"`
	Headcount    int      `json:"headcount" binding:"required,gt=0"`
	Description  *string  `json:"description"`
}

type MatchTalentsRequest struct {
	TalentIDs []string `json:"talent_ids" binding:"required"`
}

type TalentPoolRequestResponse struct {
	ID             string    `json:"id"`
	CompanyID      string    `json:"company_id"`
	SkillsNeeded   []string  `json:"skills_needed"`
	Headcount      int       `json:"headcount"`
	Description    *string   `json:"description,omitempty"`
	Status         string    `json:"status"`
	MatchedTalents []string  `json:"matched_talents"`
	CreatedAt      time.Time `json:"created_at"`
}

// --- Admin DTOs ---


type RejectTalentRequest struct {
	Note string `json:"note" binding:"required"`
}
