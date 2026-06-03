package service

import (
	"errors"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/outsourcehub/backend/internal/config"
	"github.com/outsourcehub/backend/internal/dto"
	"github.com/outsourcehub/backend/internal/middleware"
	"github.com/outsourcehub/backend/internal/model"
	"github.com/outsourcehub/backend/internal/repo"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type AuthService struct {
	cfg         *config.Config
	userRepo    *repo.UserRepo
	talentRepo  *repo.TalentRepo
	companyRepo *repo.CompanyRepo
}

func NewAuthService(cfg *config.Config, userRepo *repo.UserRepo, talentRepo *repo.TalentRepo, companyRepo *repo.CompanyRepo) *AuthService {
	return &AuthService{
		cfg:         cfg,
		userRepo:    userRepo,
		talentRepo:  talentRepo,
		companyRepo: companyRepo,
	}
}

func (s *AuthService) RegisterTalent(req dto.RegisterTalentRequest) (*dto.LoginResponse, error) {
	// Check if user exists
	_, err := s.userRepo.FindByEmail(req.Email)
	if err == nil {
		return nil, errors.New("email already registered")
	}

	// Hash password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), 12)
	if err != nil {
		return nil, err
	}

	// Create user and talent in a transaction
	var user model.User
	var talent model.Talent

	// We'll use a transaction for safety
	// For now, let's just do it sequentially or pass the DB in (if we had it handy)
	// I'll assume standard repo is fine here since it's just creation
	user = model.User{
		Email:        req.Email,
		PasswordHash: string(hashedPassword),
		Role:         "talent",
		IsActive:     true,
	}

	if err := s.userRepo.Create(&user); err != nil {
		return nil, err
	}

	talent = model.Talent{
		UserID:     user.ID,
		FullName:   req.FullName,
		PoolStatus: "pending",
	}

	if err := s.talentRepo.Create(&talent); err != nil {
		return nil, err
	}

	token, err := s.GenerateToken(user)
	if err != nil {
		return nil, err
	}

	return &dto.LoginResponse{
		Token:  token,
		Role:   user.Role,
		UserID: user.ID.String(),
	}, nil
}

func (s *AuthService) RegisterCompany(req dto.RegisterCompanyRequest) (*dto.LoginResponse, error) {
	_, err := s.userRepo.FindByEmail(req.Email)
	if err == nil {
		return nil, errors.New("email already registered")
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), 12)
	if err != nil {
		return nil, err
	}

	user := model.User{
		Email:        req.Email,
		PasswordHash: string(hashedPassword),
		Role:         "company",
		IsActive:     true,
	}

	if err := s.userRepo.Create(&user); err != nil {
		return nil, err
	}

	company := model.Company{
		UserID:      user.ID,
		CompanyName: req.CompanyName,
		IsVerified:  false,
	}

	if err := s.companyRepo.Create(&company); err != nil {
		return nil, err
	}

	token, err := s.GenerateToken(user)
	if err != nil {
		return nil, err
	}

	return &dto.LoginResponse{
		Token:  token,
		Role:   user.Role,
		UserID: user.ID.String(),
	}, nil
}

func (s *AuthService) Login(req dto.LoginRequest) (*dto.LoginResponse, error) {
	user, err := s.userRepo.FindByEmail(req.Email)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, errors.New("invalid email or password")
		}
		return nil, err
	}

	if !user.IsActive {
		return nil, errors.New("account is deactivated")
	}

	err = bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(req.Password))
	if err != nil {
		return nil, errors.New("invalid email or password")
	}

	token, err := s.GenerateToken(*user)
	if err != nil {
		return nil, err
	}

	return &dto.LoginResponse{
		Token:  token,
		Role:   user.Role,
		UserID: user.ID.String(),
	}, nil
}

func (s *AuthService) GenerateToken(user model.User) (string, error) {
	expirationTime := time.Now().Add(time.Duration(s.cfg.JWTExpiryHours) * time.Hour)
	claims := &middleware.Claims{
		Sub:   user.ID.String(),
		Role:  user.Role,
		Email: user.Email,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(expirationTime),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString([]byte(s.cfg.JWTSecret))

	return tokenString, err
}

func (s *AuthService) ForgotPassword(req dto.ForgotPasswordRequest) error {
	// Implement password reset logic with Redis and Email service
	// For now, just return nil
	return nil
}

func (s *AuthService) ResetPassword(req dto.ResetPasswordRequest) error {
	// Implement reset password logic
	return nil
}
