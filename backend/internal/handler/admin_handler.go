package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/outsourcehub/backend/internal/dto"
	"github.com/outsourcehub/backend/internal/service"
)

type AdminHandler struct {
	service *service.AdminService
}

func NewAdminHandler(service *service.AdminService) *AdminHandler {
	return &AdminHandler{service: service}
}

func (h *AdminHandler) GetDashboardStats(c *gin.Context) {
	stats, err := h.service.GetDashboardStats()
	if err != nil {
		dto.RespondError(c, http.StatusInternalServerError, "INTERNAL_ERROR", err.Error())
		return
	}

	dto.RespondSuccess(c, http.StatusOK, stats)
}

func (h *AdminHandler) ListTalents(c *gin.Context) {
	var query dto.PaginationQuery
	if err := c.ShouldBindQuery(&query); err != nil {
		dto.RespondValidationError(c, "invalid query", err.Error())
		return
	}

	talents, total, err := h.service.ListTalents(query)
	if err != nil {
		dto.RespondError(c, http.StatusInternalServerError, "INTERNAL_ERROR", err.Error())
		return
	}

	dto.RespondPaginated(c, http.StatusOK, talents, dto.Meta{
		Page:  query.Page,
		Limit: query.Limit,
		Total: total,
	})
}

func (h *AdminHandler) ListCompanies(c *gin.Context) {
	var query dto.PaginationQuery
	if err := c.ShouldBindQuery(&query); err != nil {
		dto.RespondValidationError(c, "invalid query", err.Error())
		return
	}

	companies, total, err := h.service.ListCompanies(query)
	if err != nil {
		dto.RespondError(c, http.StatusInternalServerError, "INTERNAL_ERROR", err.Error())
		return
	}

	dto.RespondPaginated(c, http.StatusOK, companies, dto.Meta{
		Page:  query.Page,
		Limit: query.Limit,
		Total: total,
	})
}

func (h *AdminHandler) UpdateTalentStatus(c *gin.Context) {
	id, _ := uuid.Parse(c.Param("id"))

	var req dto.VerifyProfileRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		dto.RespondValidationError(c, "invalid data", err.Error())
		return
	}

	if err := h.service.UpdateTalentStatus(id, req); err != nil {
		dto.RespondError(c, http.StatusInternalServerError, "UPDATE_FAILED", err.Error())
		return
	}

	dto.RespondSuccess(c, http.StatusOK, gin.H{"status": "talent status updated"})
}

func (h *AdminHandler) UpdateCompanyStatus(c *gin.Context) {
	id, _ := uuid.Parse(c.Param("id"))

	var req dto.VerifyProfileRequest
	if err := c.ShouldBindJSON(&req); err != nil { // Correcting this line
		dto.RespondValidationError(c, "invalid data", err.Error())
		return
	}

	if err := h.service.UpdateCompanyStatus(id, req); err != nil {
		dto.RespondError(c, http.StatusInternalServerError, "UPDATE_FAILED", err.Error())
		return
	}

	dto.RespondSuccess(c, http.StatusOK, gin.H{"status": "company status updated"})
}

func (h *AdminHandler) CreateContract(c *gin.Context) {
	var req dto.CreateContractRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		dto.RespondValidationError(c, "invalid contract data", err.Error())
		return
	}

	contract, err := h.service.CreateContract(req)
	if err != nil {
		dto.RespondError(c, http.StatusInternalServerError, "CONTRACT_CREATE_FAILED", err.Error())
		return
	}

	dto.RespondSuccess(c, http.StatusCreated, contract)
}
