package main

import (
	"fmt"
	"log"
	"math/rand"
	"time"

	"github.com/brianvoe/gofakeit/v6"
	"github.com/google/uuid"
	"github.com/lib/pq"
	"github.com/outsourcehub/backend/internal/config"
	"github.com/outsourcehub/backend/internal/database"
	"github.com/outsourcehub/backend/internal/model"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

const (
	NumTalents        = 20
	NumCompanies      = 5
	NumJobsPerCompany = 3
	NumAppsPerJob     = 5
	NumContracts      = 10
	NumPoolRequests   = 8
	DefaultPassword   = "password123"
)

func main() {
	cfg := config.Load()
	db := config.ConnectDB(cfg)
	
	// Run migrations
	fmt.Println("Running migrations...")
	if err := database.RunMigrations(cfg.MigrationDSN()); err != nil {
		log.Fatalf("Failed to run migrations: %v", err)
	}

	fmt.Println("Starting database seeding...")

	// 0. Seed Master Skills
	seedSkills(db)

	// 1. Seed Users and Talents
	talents := seedTalents(db)
	fmt.Printf("Seeded %d talents\n", len(talents))

	// 2. Seed Users and Companies
	companies := seedCompanies(db)
	fmt.Printf("Seeded %d companies\n", len(companies))

	// 3. Seed Jobs
	jobs := seedJobs(db, companies)
	fmt.Printf("Seeded %d jobs\n", len(jobs))

	// 4. Seed Applications
	apps := seedApplications(db, jobs, talents)
	fmt.Printf("Seeded %d applications\n", len(apps))

	// 5. Seed Contracts
	contracts := seedContracts(db, companies, talents, jobs)
	fmt.Printf("Seeded %d contracts\n", len(contracts))

	// 6. Seed Talent Pool Requests
	poolRequests := seedPoolRequests(db, companies)
	fmt.Printf("Seeded %d pool requests\n", len(poolRequests))

	fmt.Println("Seeding completed successfully!")
}

// Helpers for pointers
func strPtr(s string) *string { return &s }
func int64Ptr(i int64) *int64 { return &i }
func timePtr(t time.Time) *time.Time { return &t }

func hashPassword(password string) string {
	bytes, _ := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	return string(bytes)
}

func seedSkills(db *gorm.DB) []model.Skill {
	skillNames := []string{
		"Go", "React", "Node.js", "PostgreSQL", "Docker", "Kubernetes",
		"AWS", "TypeScript", "Python", "Java", "Flutter", "DevOps",
		"Vue.js", "Next.js", "Redis", "Elasticsearch", "TailwindCSS",
	}
	var skills []model.Skill
	for _, name := range skillNames {
		skill := model.Skill{
			ID:   uuid.New(),
			Name: name,
		}
		db.FirstOrCreate(&skill, model.Skill{Name: name})
		skills = append(skills, skill)
	}
	return skills
}

func seedTalents(db *gorm.DB) []model.Talent {
	var talents []model.Talent
	pwdHash := hashPassword(DefaultPassword)

	for i := 0; i < NumTalents; i++ {
		user := model.User{
			ID:            uuid.New(),
			Email:         gofakeit.Email(),
			PasswordHash:  pwdHash,
			Role:          "talent",
			Status:        "active",
			IsActive:      true,
			EmailVerified: true,
		}
		db.Create(&user)

		birthDate := gofakeit.DateRange(time.Now().AddDate(-40, 0, 0), time.Now().AddDate(-20, 0, 0))
		
		talent := model.Talent{
			ID:              uuid.New(),
			UserID:          user.ID,
			FullName:        gofakeit.Name(),
			Phone:           strPtr(gofakeit.Phone()),
			BirthDate:       &birthDate,
			Gender:          strPtr(gofakeit.RandomString([]string{"male", "female"})),
			Address:         strPtr(gofakeit.Address().Address),
			City:            strPtr(gofakeit.City()),
			Province:        strPtr(gofakeit.State()),
			CurrentJobTitle: strPtr(gofakeit.JobTitle()),
			ExpectedSalary:  int64Ptr(int64(rand.Intn(10000000) + 5000000)),
			Summary:         strPtr(gofakeit.Paragraph(1, 2, 5, "\n")),
			Skills:          pq.StringArray{"Go", "React"},
			ExperienceYears: rand.Intn(10),
			PoolStatus:      gofakeit.RandomString([]string{"pending", "approved", "active"}),
		}
		db.Create(&talent)
		talents = append(talents, talent)
	}
	return talents
}

func seedCompanies(db *gorm.DB) []model.Company {
	var companies []model.Company
	pwdHash := hashPassword(DefaultPassword)

	for i := 0; i < NumCompanies; i++ {
		user := model.User{
			ID:            uuid.New(),
			Email:         gofakeit.Email(),
			PasswordHash:  pwdHash,
			Role:          "company",
			IsActive:      true,
			EmailVerified: true,
		}
		db.Create(&user)

		company := model.Company{
			ID:               uuid.New(),
			UserID:           user.ID,
			CompanyName:      gofakeit.Company(),
			Industry:         strPtr(gofakeit.JobTitle()),
			CompanySize:      strPtr(gofakeit.RandomString([]string{"1-10", "11-50", "51-200", "201-500", "500+"})),
			Website:          strPtr(gofakeit.URL()),
			Description:      strPtr(gofakeit.Paragraph(1, 3, 5, "\n")),
			Address:          strPtr(gofakeit.Address().Address),
			NPWP:             strPtr(gofakeit.DigitN(15)),
			SubscriptionPlan: "pro",
			IsVerified:       true,
		}
		db.Create(&company)
		companies = append(companies, company)
	}
	return companies
}

func seedJobs(db *gorm.DB, companies []model.Company) []model.Job {
	var jobs []model.Job
	for _, comp := range companies {
		for j := 0; j < NumJobsPerCompany; j++ {
			job := model.Job{
				ID:             uuid.New(),
				CompanyID:      comp.ID,
				Title:          gofakeit.JobTitle(),
				Description:    gofakeit.Paragraph(2, 4, 10, "\n"),
				Requirements:   strPtr(gofakeit.Paragraph(1, 3, 5, "\n")),
				Location:       strPtr(gofakeit.City()),
				JobType:        gofakeit.RandomString([]string{"full-time", "part-time", "contract", "outsource"}),
				SalaryMin:      int64Ptr(int64(rand.Intn(5000000) + 5000000)),
				SalaryMax:      int64Ptr(int64(rand.Intn(10000000) + 10000000)),
				SkillsRequired: pq.StringArray{"Go", "PostgreSQL"},
				Status:         "open",
				Deadline:       timePtr(time.Now().AddDate(0, 1, 0)),
				Slots:          rand.Intn(5) + 1,
				CreatedBy:      comp.UserID,
			}
			db.Create(&job)
			jobs = append(jobs, job)
		}
	}
	return jobs
}

func seedApplications(db *gorm.DB, jobs []model.Job, talents []model.Talent) []model.Application {
	var apps []model.Application
	for _, job := range jobs {
		// Pick random talents for each job
		perm := rand.Perm(len(talents))
		for i := 0; i < NumAppsPerJob; i++ {
			talent := talents[perm[i]]
			
			app := model.Application{
				ID:          uuid.New(),
				JobID:       job.ID,
				TalentID:    talent.ID,
				CoverLetter: strPtr(gofakeit.Sentence(20)),
				Status:      gofakeit.RandomString([]string{"pending", "reviewed", "shortlisted", "rejected", "hired"}),
			}
			db.Create(&app)
			apps = append(apps, app)
		}
	}
	return apps
}

func seedContracts(db *gorm.DB, companies []model.Company, talents []model.Talent, jobs []model.Job) []model.Contract {
	var contracts []model.Contract
	for i := 0; i < NumContracts; i++ {
		comp := companies[rand.Intn(len(companies))]
		talent := talents[rand.Intn(len(talents))]
		job := jobs[rand.Intn(len(jobs))]
		
		start := time.Now().AddDate(0, 0, -rand.Intn(30))
		end := start.AddDate(0, 6, 0)
		
		contract := model.Contract{
			ID:             uuid.New(),
			CompanyID:      comp.ID,
			TalentID:       talent.ID,
			JobID:          &job.ID,
			ContractNumber: fmt.Sprintf("CTR-%d", gofakeit.Number(1000, 9999)),
			StartDate:      start,
			EndDate:        &end,
			MonthlyRate:    int64(rand.Intn(10000000) + 5000000),
			PlatformFeePct: 10.0,
			Status:         "active",
			CreatedBy:      comp.UserID,
		}
		db.Create(&contract)
		contracts = append(contracts, contract)
	}
	return contracts
}

func seedPoolRequests(db *gorm.DB, companies []model.Company) []model.TalentPoolRequest {
	var requests []model.TalentPoolRequest
	for i := 0; i < NumPoolRequests; i++ {
		comp := companies[rand.Intn(len(companies))]
		
		req := model.TalentPoolRequest{
			ID:           uuid.New(),
			CompanyID:    comp.ID,
			SkillsNeeded: pq.StringArray{"DevOps", "AWS", "Kubernetes"},
			Headcount:    rand.Intn(5) + 1,
			Description:  strPtr(gofakeit.Sentence(15)),
			Status:       "open",
		}
		db.Create(&req)
		requests = append(requests, req)
	}
	return requests
}
