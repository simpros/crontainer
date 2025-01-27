package taskhandler

import (
	"encoding/json"
	"io"
	"time"

	"github.com/simpros/crontainer/internal/handler"
	"github.com/simpros/crontainer/repository"
)

type TaskDTO struct {
	ID        int64  `json:"id"`
	Name      string `json:"name"`
	Command   string `json:"command"`
	CreatedAt string `json:"createdAt"`
	UpdatedAt string `json:"updatedAt"`
}

func ParseTaskToDTO(task repository.Task) TaskDTO {
	return TaskDTO{
		ID:        task.ID,
		Name:      task.Name,
		Command:   task.Command,
		CreatedAt: task.CreatedAt.Time.Format(time.RFC3339),
		UpdatedAt: task.UpdatedAt.Time.Format(time.RFC3339),
	}
}

type CreateTask struct {
	Name    string `json:"name,omitempty"`
	Command string `json:"command,omitempty"`
}

func ParseBodyToCreateTask(body io.ReadCloser) (repository.CreateTaskParams, error) {
	var createTask CreateTask
	decoder := json.NewDecoder(body)
	decoder.DisallowUnknownFields()
	err := decoder.Decode(&createTask)
	if err != nil {
		return repository.CreateTaskParams{}, err
	}

	if createTask.Name == "" {
		return repository.CreateTaskParams{}, &handler.CrontainerError{Code: 400, Message: "name is required"}
	}
	if createTask.Command == "" {
		return repository.CreateTaskParams{}, &handler.CrontainerError{Code: 400, Message: "command is required"}
	}

	return repository.CreateTaskParams{
		Name:    createTask.Name,
		Command: createTask.Command,
	}, nil
}
