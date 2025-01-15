package cronhandler

import (
	"time"

	"github.com/simpros/crontainer/repository"
)

type TaskDTO struct {
	ID        int64  `json:"id"`
	Name      string `json:"name"`
	Command   string `json:"command"`
	CreatedAt string `json:"createdAt"`
	UpdatedAt string `json:"updatedAt"`
}

func TaskToDTO(task repository.Task) TaskDTO {
	return TaskDTO{
		ID:        task.ID,
		Name:      task.Name,
		Command:   task.Command,
		CreatedAt: task.CreatedAt.Time.Format(time.RFC3339),
		UpdatedAt: task.UpdatedAt.Time.Format(time.RFC3339),
	}
}
