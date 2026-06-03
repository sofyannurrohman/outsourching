package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/outsourcehub/backend/internal/dto"
	"github.com/outsourcehub/backend/internal/service"
)

type CompanyHandler struct {
	service *service.CompanyService
}

func NewCompanyHandler(service *service.CompanyService) *CompanyHandler {
	return &CompanyHandler{service: service}
}

func (h *CompanyHandler) GetProfile(c *gin.Context) {
	userIDStr, _ := c.Get("user_id")
	userID, _ := uuid.Parse(userIDStr.(string))

	profile, err := h.service.GetProfile(userID)
	if err != nil {
		dto.RespondError(c, http.StatusNotFound, "NOT_FOUND", "Profile not found")
		return
	}

	dto.RespondSuccess(c, http.StatusOK, profile)
}

func (h *CompanyHandler) UpdateProfile(c *gin.Context) {
	userIDStr, _ := c.Get("user_id")
	userID, _ := uuid.Parse(userIDStr.(string))

	var req dto.UpdateCompanyProfileRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		dto.RespondValidationError(c, "invalid profile update data", err.Error())
		return
	}

	profile, err := h.service.UpdateProfile(userID, req)
	if err != nil {
		dto.RespondError(c, http.StatusInternalServerError, "INTERNAL_ERROR", "Failed to update profile")
		return
	}

	dto.RespondSuccess(c, http.StatusOK, profile)
}

func (h *CompanyHandler) UploadLogo(c *gin.Context) {
	file, header, err := c.Request.FormFile("logo")
	if err != nil {
		dto.RespondValidationError(c, "logo is required", err.Error())
		return
	}
	defer file.Close()

	userIDStr, _ := c.Get("user_id")
	userID, _ := uuid.Parse(userIDStr.(string))

	upload := dto.FileUpload{
		Reader:   file,
		Filename: header.Filename,
		Size:     header.Size,
	}

	url, err := h.service.UploadLogo(userID, upload)
	if err != nil {
		dto.RespondError(c, http.StatusBadRequest, "UPLOAD_FAILED", err.Error())
		return
	}

	dto.RespondSuccess(c, http.StatusOK, gin.H{"logo_url": url})
}
