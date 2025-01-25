package handler

import (
	"encoding/json"
	"net/http"
)

type CrontainerResponse struct {
	Status int         `json:"-"`
	Data   interface{} `json:"data"`
}

func NewCrontainerResponse(status int, data interface{}) *CrontainerResponse {
	return &CrontainerResponse{
		Status: status,
		Data:   data,
	}
}

func WriteCrontainerResponse(w http.ResponseWriter, response *CrontainerResponse) {
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.WriteHeader(response.Status)
	if err := json.NewEncoder(w).Encode(response); err != nil {
		http.Error(w, "Failed to encode response", http.StatusInternalServerError)
	}
}
