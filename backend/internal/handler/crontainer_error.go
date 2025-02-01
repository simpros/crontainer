package handler

import (
	"encoding/json"
	"errors"
	"net/http"
)

type CrontainerError struct {
	Code    int    `json:"code"`
	Message string `json:"message"`
}

func (e *CrontainerError) Error() string {
	return e.Message
}

func WriteErrorResponse(w http.ResponseWriter, err error) {
	var crontainerErr *CrontainerError
	if errors.As(err, &crontainerErr) {
		w.Header().Set("Content-Type", "application/json; charset=utf-8")
		w.WriteHeader(crontainerErr.Code)
		if err := json.NewEncoder(w).Encode(crontainerErr); err != nil {
			http.Error(w, "Failed to encode error response", http.StatusInternalServerError)
		}
		return
	}
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.WriteHeader(http.StatusInternalServerError)
	if err := json.NewEncoder(w).Encode(CrontainerError{Code: 500, Message: err.Error()}); err != nil {
		http.Error(w, "Failed to encode error response", http.StatusInternalServerError)
	}
}
