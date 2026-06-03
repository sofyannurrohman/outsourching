package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/outsourcehub/backend/internal/dto"
	"github.com/outsourcehub/backend/internal/repo"
)

type SkillHandler struct {
	repo *repo.SkillRepo
}

func NewSkillHandler(repo *repo.SkillRepo) *SkillHandler {
	return &SkillHandler{repo: repo}
}

func (h *SkillHandler) ListAll(c *gin.Context) {
	skills, err := h.repo.ListAll()
	if err != nil {
		dto.RespondError(c, http.StatusInternalServerError, "INTERNAL_ERROR", "failed to fetch skills")
		return
	}

	dto.RespondSuccess(c, http.StatusOK, skills)
}
