package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/outsourcehub/backend/internal/dto"
	"github.com/outsourcehub/backend/internal/service"
)

type JobHandler struct {
	service *service.JobService
}

func NewJobHandler(service *service.JobService) *JobHandler {
	return &JobHandler{service: service}
}

func (h *JobHandler) CreateJob(c *gin.Context) {
	userIDStr, _ := c.Get("user_id")
	userID, _ := uuid.Parse(userIDStr.(string))

	var req dto.CreateJobRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		dto.RespondValidationError(c, "invalid job creation data", err.Error())
		return
	}

	job, err := h.service.CreateJob(userID, req)
	if err != nil {
		dto.RespondError(c, http.StatusBadRequest, "CREATE_FAILED", err.Error())
		return
	}

	dto.RespondSuccess(c, http.StatusCreated, job)
}

func (h *JobHandler) GetJob(c *gin.Context) {
	idStr := c.Param("id")
	id, err := uuid.Parse(idStr)
	if err != nil {
		dto.RespondError(c, http.StatusBadRequest, "INVALID_ID", "Invalid job ID")
		return
	}

	job, err := h.service.GetJob(id)
	if err != nil {
		dto.RespondError(c, http.StatusNotFound, "NOT_FOUND", "Job not found")
		return
	}

	dto.RespondSuccess(c, http.StatusOK, job)
}

func (h *JobHandler) ListPublic(c *gin.Context) {
	var query dto.PaginationQuery
	if err := c.ShouldBindQuery(&query); err != nil {
		dto.RespondValidationError(c, "invalid query", err.Error())
		return
	}

	jobs, total, err := h.service.ListPublicJobs(query)
	if err != nil {
		dto.RespondError(c, http.StatusInternalServerError, "INTERNAL_ERROR", "Failed to list jobs")
		return
	}

	dto.RespondPaginated(c, http.StatusOK, jobs, dto.Meta{
		Page:  query.Page,
		Limit: query.Limit,
		Total: total,
	})
}

func (h *JobHandler) ListCompanyJobs(c *gin.Context) {
	userIDStr, _ := c.Get("user_id")
	userID, _ := uuid.Parse(userIDStr.(string))

	var query dto.PaginationQuery
	if err := c.ShouldBindQuery(&query); err != nil {
		dto.RespondValidationError(c, "invalid query", err.Error())
		return
	}

	jobs, total, err := h.service.ListCompanyJobs(userID, query)
	if err != nil {
		dto.RespondError(c, http.StatusInternalServerError, "INTERNAL_ERROR", "Failed to list company jobs")
		return
	}

	dto.RespondPaginated(c, http.StatusOK, jobs, dto.Meta{
		Page:  query.Page,
		Limit: query.Limit,
		Total: total,
	})
}

func (h *JobHandler) UpdateJob(c *gin.Context) {
	userIDStr, _ := c.Get("user_id")
	userID, _ := uuid.Parse(userIDStr.(string))

	jobIDStr := c.Param("id")
	jobID, _ := uuid.Parse(jobIDStr)

	var req dto.UpdateJobRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		dto.RespondValidationError(c, "invalid update data", err.Error())
		return
	}

	job, err := h.service.UpdateJob(userID, jobID, req)
	if err != nil {
		dto.RespondError(c, http.StatusBadRequest, "UPDATE_FAILED", err.Error())
		return
	}

	dto.RespondSuccess(c, http.StatusOK, job)
}

func (h *JobHandler) DeleteJob(c *gin.Context) {
	userIDStr, _ := c.Get("user_id")
	userID, _ := uuid.Parse(userIDStr.(string))

	jobIDStr := c.Param("id")
	jobID, _ := uuid.Parse(jobIDStr)

	if err := h.service.DeleteJob(userID, jobID); err != nil {
		dto.RespondError(c, http.StatusBadRequest, "DELETE_FAILED", err.Error())
		return
	}

	dto.RespondSuccess(c, http.StatusOK, gin.H{"status": "job deleted successfully"})
}
