package dto

import "io"

type FileUpload struct {
	Reader   io.Reader
	Filename string
	Size     int64
}
