package errors

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
		w.WriteHeader(crontainerErr.Code)
		if err := json.NewEncoder(w).Encode(crontainerErr); err != nil {
			http.Error(w, "Failed to encode error response", http.StatusInternalServerError)
		}
		return
	}
	w.WriteHeader(http.StatusInternalServerError)
	if err := json.NewEncoder(w).Encode(CrontainerError{Code: -1, Message: "An unknown error occurred"}); err != nil {
		http.Error(w, "Failed to encode error response", http.StatusInternalServerError)
	}
}
