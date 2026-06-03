package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/outsourcehub/backend/internal/dto"
	"github.com/outsourcehub/backend/internal/service"
)

type TalentHandler struct {
	service *service.TalentService
}

func NewTalentHandler(service *service.TalentService) *TalentHandler {
	return &TalentHandler{service: service}
}

func (h *TalentHandler) GetProfile(c *gin.Context) {
	userIDStr, _ := c.Get("user_id")
	userID, _ := uuid.Parse(userIDStr.(string))

	profile, err := h.service.GetProfile(userID)
	if err != nil {
		dto.RespondError(c, http.StatusNotFound, "NOT_FOUND", "Profile not found")
		return
	}

	dto.RespondSuccess(c, http.StatusOK, profile)
}

func (h *TalentHandler) UpdateProfile(c *gin.Context) {
	userIDStr, _ := c.Get("user_id")
	userID, _ := uuid.Parse(userIDStr.(string))

	var req dto.UpdateTalentProfileRequest
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

func (h *TalentHandler) UploadAvatar(c *gin.Context) {
	file, header, err := c.Request.FormFile("avatar")
	if err != nil {
		dto.RespondValidationError(c, "avatar is required", err.Error())
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

	url, err := h.service.UploadAvatar(userID, upload)
	if err != nil {
		dto.RespondError(c, http.StatusBadRequest, "UPLOAD_FAILED", err.Error())
		return
	}

	dto.RespondSuccess(c, http.StatusOK, gin.H{"avatar_url": url})
}

func (h *TalentHandler) UploadCV(c *gin.Context) {
	file, header, err := c.Request.FormFile("cv")
	if err != nil {
		dto.RespondValidationError(c, "cv is required", err.Error())
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

	url, err := h.service.UploadCV(userID, upload)
	if err != nil {
		dto.RespondError(c, http.StatusBadRequest, "UPLOAD_FAILED", err.Error())
		return
	}

	dto.RespondSuccess(c, http.StatusOK, gin.H{"cv_url": url})
}

func (h *TalentHandler) GetPoolStatus(c *gin.Context) {
	userIDStr, _ := c.Get("user_id")
	userID, _ := uuid.Parse(userIDStr.(string))

	profile, err := h.service.GetProfile(userID)
	if err != nil {
		dto.RespondError(c, http.StatusNotFound, "NOT_FOUND", "Profile not found")
		return
	}

	dto.RespondSuccess(c, http.StatusOK, gin.H{"pool_status": profile.PoolStatus})
}
