package dto

import "time"

type AdminDashboardStats struct {
	TotalTalents      int64   `json:"total_talents"`
	ActiveTalents     int64   `json:"active_talents"`
	TotalCompanies    int64   `json:"total_companies"`
	VerifiedCompanies int64   `json:"verified_companies"`
	ActiveJobs        int64   `json:"active_jobs"`
	ActiveContracts   int64   `json:"active_contracts"`
	MonthlyRevenue    float64 `json:"monthly_revenue"`
	TotalRevenue      float64 `json:"total_revenue"`
}

type VerifyProfileRequest struct {
	Status    string `json:"status" binding:"required,oneof=active rejected verified suspended"`
	AdminNote string `json:"admin_note"`
}

type CreateContractRequest struct {
	JobID         string    `json:"job_id" binding:"required"`
	TalentID      string    `json:"talent_id" binding:"required"`
	CompanyID     string    `json:"company_id" binding:"required"`
	MonthlyRate   int64     `json:"monthly_rate" binding:"required"`
	PlatformFee   float64   `json:"platform_fee_pct"`
	StartDate     time.Time `json:"start_date" binding:"required"`
	EndDate       time.Time `json:"end_date"`
}
