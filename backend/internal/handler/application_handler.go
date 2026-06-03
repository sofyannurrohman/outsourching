package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/outsourcehub/backend/internal/dto"
	"github.com/outsourcehub/backend/internal/service"
)

type ApplicationHandler struct {
	service *service.ApplicationService
}

func NewApplicationHandler(service *service.ApplicationService) *ApplicationHandler {
	return &ApplicationHandler{service: service}
}

func (h *ApplicationHandler) Apply(c *gin.Context) {
	userIDStr, _ := c.Get("user_id")
	userID, _ := uuid.Parse(userIDStr.(string))

	var req dto.ApplyJobRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		dto.RespondValidationError(c, "invalid application data", err.Error())
		return
	}

	app, err := h.service.Apply(userID, req)
	if err != nil {
		dto.RespondError(c, http.StatusBadRequest, "APPLY_FAILED", err.Error())
		return
	}

	dto.RespondSuccess(c, http.StatusCreated, app)
}

func (h *ApplicationHandler) ListTalentApplications(c *gin.Context) {
	userIDStr, _ := c.Get("user_id")
	userID, _ := uuid.Parse(userIDStr.(string))

	var query dto.PaginationQuery
	if err := c.ShouldBindQuery(&query); err != nil {
		dto.RespondValidationError(c, "invalid query", err.Error())
		return
	}

	apps, total, err := h.service.ListTalentApplications(userID, query)
	if err != nil {
		dto.RespondError(c, http.StatusInternalServerError, "INTERNAL_ERROR", err.Error())
		return
	}

	dto.RespondPaginated(c, http.StatusOK, apps, dto.Meta{
		Page:  query.Page,
		Limit: query.Limit,
		Total: total,
	})
}

func (h *ApplicationHandler) ListJobApplications(c *gin.Context) {
	userIDStr, _ := c.Get("user_id")
	userID, _ := uuid.Parse(userIDStr.(string))

	jobIDStr := c.Param("jobID")
	jobID, _ := uuid.Parse(jobIDStr)

	var query dto.PaginationQuery
	if err := c.ShouldBindQuery(&query); err != nil {
		dto.RespondValidationError(c, "invalid query", err.Error())
		return
	}

	apps, total, err := h.service.ListJobApplications(userID, jobID, query)
	if err != nil {
		dto.RespondError(c, http.StatusInternalServerError, "INTERNAL_ERROR", err.Error())
		return
	}

	dto.RespondPaginated(c, http.StatusOK, apps, dto.Meta{
		Page:  query.Page,
		Limit: query.Limit,
		Total: total,
	})
}

func (h *ApplicationHandler) UpdateStatus(c *gin.Context) {
	userIDStr, _ := c.Get("user_id")
	userID, _ := uuid.Parse(userIDStr.(string))

	appIDStr := c.Param("id")
	appID, _ := uuid.Parse(appIDStr)

	var req dto.UpdateApplicationStatusRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		dto.RespondValidationError(c, "invalid status update data", err.Error())
		return
	}

	app, err := h.service.UpdateStatus(userID, appID, req)
	if err != nil {
		dto.RespondError(c, http.StatusBadRequest, "UPDATE_FAILED", err.Error())
		return
	}

	dto.RespondSuccess(c, http.StatusOK, app)
}
