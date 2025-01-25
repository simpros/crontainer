package taskhandler

import (
	"fmt"
	"net/url"
	"time"

	"github.com/simpros/crontainer/internal/errors"
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

func ParseFormToCreateTaskParams(form url.Values) (repository.CreateTaskParams, error) {
	if len(form) > 2 {
		return repository.CreateTaskParams{}, &errors.CrontainerError{Code: 400, Message: fmt.Sprintf("too many parameters, expected 2, got %d", len(form))}
	}
	if form.Get("name") == "" || form.Get("command") == "" {
		return repository.CreateTaskParams{}, &errors.CrontainerError{Code: 400, Message: "name and command are required"}
	}
	return repository.CreateTaskParams{
		Name:    form.Get("name"),
		Command: form.Get("command"),
	}, nil
}
