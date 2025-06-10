package middleware

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
)

// Result is a struct for API responses
type Result struct {
	Code    int         `json:"code"`
	Message string      `json:"message"`
	Data    interface{} `json:"data,omitempty"`
}

// Define a custom context key type
type contextKey string

const dataFileKey contextKey = "dataFile"

// UploadFile is a middleware to handle file uploads
func UploadFile(next http.HandlerFunc, formImage string) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		const MAX_UPLOAD_SIZE = 10 << 20 // 10MB

		// Check file size
		r.Body = http.MaxBytesReader(w, r.Body, MAX_UPLOAD_SIZE)

		err := r.ParseMultipartForm(MAX_UPLOAD_SIZE)
		if err != nil {
			http.Error(w, "File too large", http.StatusBadRequest)
			return
		}

		file, _, err := r.FormFile(formImage)
		if err != nil {
			fmt.Println(err)
			json.NewEncoder(w).Encode(Result{
				Code:    http.StatusBadRequest,
				Message: "Error retrieving the file",
			})
			return
		}
		defer file.Close()

		tempFile, err := os.CreateTemp("uploads", "image-*.png")
		if err != nil {
			fmt.Println("Path upload error:", err)
			json.NewEncoder(w).Encode(Result{
				Code:    http.StatusInternalServerError,
				Message: "Failed to create temp file",
			})
			return
		}
		defer tempFile.Close()

		_, err = io.Copy(tempFile, file)
		if err != nil {
			fmt.Println("Error saving file:", err)
			json.NewEncoder(w).Encode(Result{
				Code:    http.StatusInternalServerError,
				Message: "Failed to save file",
			})
			return
		}

		// Extract filename only
		data := tempFile.Name()
		filename := data[8:] // strip "uploads/"

		// Add filename to context
		ctx := context.WithValue(r.Context(), dataFileKey, filename)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}
