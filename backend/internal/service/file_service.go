package service

import (
	"fmt"
	"io"
	"os"

	"path/filepath"
	"strings"
	"time"

	"github.com/google/uuid"
	"github.com/outsourcehub/backend/internal/config"
)

type FileService struct {
	cfg *config.Config
}

func NewFileService(cfg *config.Config) *FileService {
	// Ensure upload directory exists
	if _, err := os.Stat(cfg.UploadDir); os.IsNotExist(err) {
		os.MkdirAll(cfg.UploadDir, 0755)
	}
	return &FileService{cfg: cfg}
}

func (s *FileService) UploadFile(file io.Reader, filename string, subfolder string) (string, error) {
	// Create subfolder if it doesn't exist
	folderPath := filepath.Join(s.cfg.UploadDir, subfolder)
	if _, err := os.Stat(folderPath); os.IsNotExist(err) {
		os.MkdirAll(folderPath, 0755)
	}

	// Generate unique filename
	ext := filepath.Ext(filename)
	uniqueName := fmt.Sprintf("%s_%d%s", uuid.New().String(), time.Now().Unix(), ext)
	filePath := filepath.Join(folderPath, uniqueName)

	// Create files
	dst, err := os.Create(filePath)
	if err != nil {
		return "", err
	}
	defer dst.Close()

	// Copy content
	if _, err := io.Copy(dst, file); err != nil {
		return "", err
	}

	// Return the relative URL/path
	// In production/VPS, this would be served by Nginx or the Go app
	return fmt.Sprintf("/uploads/%s/%s", subfolder, uniqueName), nil
}

func (s *FileService) ValidateFileType(filename string, allowedTypes []string) error {
	ext := strings.ToLower(filepath.Ext(filename))
	for _, t := range allowedTypes {
		if ext == t {
			return nil
		}
	}
	return fmt.Errorf("file type %s is not allowed. allowed: %s", ext, strings.Join(allowedTypes, ", "))
}

func (s *FileService) ValidateFileSize(size int64) error {
	if size > s.cfg.MaxUploadSize {
		return fmt.Errorf("file size too large. maximum allowed is %d bytes", s.cfg.MaxUploadSize)
	}
	return nil
}
