package handler

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/outsourcehub/backend/internal/config"
	"github.com/outsourcehub/backend/internal/middleware"
	"github.com/outsourcehub/backend/internal/repo"
	"github.com/outsourcehub/backend/internal/service"
	"github.com/redis/go-redis/v9"
	"gorm.io/gorm"
)

func NewRouter(cfg *config.Config, db *gorm.DB, rdb *redis.Client) *gin.Engine {
	r := gin.New()

	// Global Middleware
	r.Use(middleware.RequestLogger())
	r.Use(gin.Recovery())
	r.Use(middleware.CORS(cfg))

	// Initializing repositories
	userRepo := repo.NewUserRepo(db)
	talentRepo := repo.NewTalentRepo(db)
	companyRepo := repo.NewCompanyRepo(db)
	jobRepo := repo.NewJobRepo(db)
	appRepo := repo.NewApplicationRepo(db)
	contractRepo := repo.NewContractRepo(db)

	// Initializing services
	fileService := service.NewFileService(cfg)
	notifService := service.NewNotificationService(cfg)
	authService := service.NewAuthService(cfg, userRepo, talentRepo, companyRepo)
	talentService := service.NewTalentService(talentRepo, fileService)
	companyService := service.NewCompanyService(companyRepo, fileService)
	jobService := service.NewJobService(jobRepo, companyRepo)
	appService := service.NewApplicationService(appRepo, talentRepo, jobRepo, companyRepo, notifService)
	adminService := service.NewAdminService(talentRepo, companyRepo, jobRepo, contractRepo)

	// Initializing handlers
	authHandler := NewAuthHandler(authService)
	talentHandler := NewTalentHandler(talentService)
	companyHandler := NewCompanyHandler(companyService)
	jobHandler := NewJobHandler(jobService)
	appHandler := NewApplicationHandler(appService)
	adminHandler := NewAdminHandler(adminService)

	// Static files for uploads (in VPS/local dev)
	r.Static("/uploads", cfg.UploadDir)

	// API Groups
	v1 := r.Group("/api/v1")
	{
		// Health check
		v1.GET("/health", func(c *gin.Context) {
			c.JSON(http.StatusOK, gin.H{"status": "ok"})
		})

		// Auth Group
		auth := v1.Group("/auth")
		auth.Use(middleware.RateLimiter(rdb, 10, 1*time.Minute))
		{
			auth.POST("/register/talent", authHandler.RegisterTalent)
			auth.POST("/register/company", authHandler.RegisterCompany)
			auth.POST("/login", authHandler.Login)
			auth.POST("/refresh", authHandler.RefreshToken)
			auth.POST("/forgot-password", authHandler.ForgotPassword)
			auth.POST("/reset-password", authHandler.ResetPassword)

			authWithAuth := auth.Group("")
			authWithAuth.Use(middleware.AuthRequired(cfg))
			{
				authWithAuth.GET("/me", authHandler.Me)
			}
		}

	// Public Endpoints
	skillsRepo := repo.NewSkillRepo(db)
	skillsHandler := NewSkillHandler(skillsRepo)

	v1.GET("/skills", skillsHandler.ListAll)

	jobs := v1.Group("/jobs")
	{
		jobs.GET("", jobHandler.ListPublic)
		jobs.GET("/:id", jobHandler.GetJob)
	}

		// Authenticated Routes
		api := v1.Group("")
		api.Use(middleware.AuthRequired(cfg))
		api.Use(middleware.RateLimiter(rdb, 100, 1*time.Minute))
		{
			// Talent Routes
			talent := api.Group("/talent")
			talent.Use(middleware.RoleGuard("talent"))
			{
				talent.GET("/profile", talentHandler.GetProfile)
				talent.PUT("/profile", talentHandler.UpdateProfile)
				talent.POST("/profile/avatar", talentHandler.UploadAvatar)
				talent.POST("/profile/cv", talentHandler.UploadCV)
				talent.GET("/applications", appHandler.ListTalentApplications)
				talent.POST("/applications", appHandler.Apply)
				talent.GET("/pool/status", talentHandler.GetPoolStatus)
			}

			// Company Routes
			company := api.Group("/company")
			company.Use(middleware.RoleGuard("company"))
			{
				company.GET("/profile", companyHandler.GetProfile)
				company.PUT("/profile", companyHandler.UpdateProfile)
				company.POST("/profile/logo", companyHandler.UploadLogo)
				company.GET("/jobs", jobHandler.ListCompanyJobs)
				company.POST("/jobs", jobHandler.CreateJob)
				company.PUT("/jobs/:id", jobHandler.UpdateJob)
				company.DELETE("/jobs/:id", jobHandler.DeleteJob)
				company.GET("/jobs/:jobID/applications", appHandler.ListJobApplications)
				company.PATCH("/applications/:id/status", appHandler.UpdateStatus)
			}

			// Admin Routes
			admin := api.Group("/admin")
			admin.Use(middleware.RoleGuard("admin"))
			{
				admin.GET("/stats", adminHandler.GetDashboardStats)
				admin.GET("/talents", adminHandler.ListTalents)
				admin.PATCH("/talents/:id/status", adminHandler.UpdateTalentStatus)
				admin.GET("/companies", adminHandler.ListCompanies)
				admin.PATCH("/companies/:id/status", adminHandler.UpdateCompanyStatus)
				admin.POST("/contracts", adminHandler.CreateContract)
			}
		}
	}

	return r
}
