package handler

import (
	"encoding/json"
	"net/http"
)

type crontainerResponse struct {
	Status int         `json:"-"`
	Data   interface{} `json:"data"`
}

func NewCrontainerResponse(status int, data interface{}) *crontainerResponse {
	return &crontainerResponse{
		Status: status,
		Data:   data,
	}
}

func WriteCrontainerResponse(w http.ResponseWriter, response *crontainerResponse) {
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.WriteHeader(response.Status)
	if err := json.NewEncoder(w).Encode(response); err != nil {
		http.Error(w, "Failed to encode response", http.StatusInternalServerError)
	}
}
