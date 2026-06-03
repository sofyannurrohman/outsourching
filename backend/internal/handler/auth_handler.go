package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/outsourcehub/backend/internal/dto"
	"github.com/outsourcehub/backend/internal/service"
)

type AuthHandler struct {
	service *service.AuthService
}

func NewAuthHandler(service *service.AuthService) *AuthHandler {
	return &AuthHandler{service: service}
}

func (h *AuthHandler) RegisterTalent(c *gin.Context) {
	var req dto.RegisterTalentRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		dto.RespondValidationError(c, "invalid register data", err.Error())
		return
	}

	res, err := h.service.RegisterTalent(req)
	if err != nil {
		dto.RespondError(c, http.StatusBadRequest, "REGISTER_FAILED", err.Error())
		return
	}

	dto.RespondSuccess(c, http.StatusCreated, res)
}

func (h *AuthHandler) RegisterCompany(c *gin.Context) {
	var req dto.RegisterCompanyRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		dto.RespondValidationError(c, "invalid register data", err.Error())
		return
	}

	res, err := h.service.RegisterCompany(req)
	if err != nil {
		dto.RespondError(c, http.StatusBadRequest, "REGISTER_FAILED", err.Error())
		return
	}

	dto.RespondSuccess(c, http.StatusCreated, res)
}

func (h *AuthHandler) Login(c *gin.Context) {
	var req dto.LoginRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		dto.RespondValidationError(c, "invalid login data", err.Error())
		return
	}

	res, err := h.service.Login(req)
	if err != nil {
		dto.RespondError(c, http.StatusUnauthorized, "LOGIN_FAILED", err.Error())
		return
	}

	dto.RespondSuccess(c, http.StatusOK, res)
}

func (h *AuthHandler) RefreshToken(c *gin.Context) {
	// Implement refresh token
	dto.RespondSuccess(c, http.StatusOK, "refreshed")
}

func (h *AuthHandler) ForgotPassword(c *gin.Context) {
	var req dto.ForgotPasswordRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		dto.RespondValidationError(c, "invalid input", err.Error())
		return
	}

	err := h.service.ForgotPassword(req)
	if err != nil {
		dto.RespondError(c, http.StatusBadRequest, "FORGOT_PASSWORD_FAILED", err.Error())
		return
	}

	dto.RespondSuccess(c, http.StatusOK, gin.H{"message": "reset instructions sent to email"})
}

func (h *AuthHandler) ResetPassword(c *gin.Context) {
	var req dto.ResetPasswordRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		dto.RespondValidationError(c, "invalid input", err.Error())
		return
	}

	err := h.service.ResetPassword(req)
	if err != nil {
		dto.RespondError(c, http.StatusBadRequest, "RESET_PASSWORD_FAILED", err.Error())
		return
	}

	dto.RespondSuccess(c, http.StatusOK, gin.H{"message": "password reset successfully"})
}

func (h *AuthHandler) Me(c *gin.Context) {
	userID, _ := c.Get("user_id")
	role, _ := c.Get("user_role")
	email, _ := c.Get("user_email")

	dto.RespondSuccess(c, http.StatusOK, gin.H{
		"user_id": userID,
		"role":    role,
		"email":   email,
	})
}
