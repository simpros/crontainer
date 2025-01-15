package cronhandler

import (
	"context"
	"encoding/json"
	"log/slog"
	"net/http"

	"github.com/simpros/crontainer/repository"
)

type TaskHandler struct {
	logger  *slog.Logger
	queries *repository.Queries
}

func New(logger *slog.Logger, queries *repository.Queries, ctx context.Context) (*TaskHandler, error) {
	dockermgm := &TaskHandler{
		logger:  logger,
		queries: queries,
	}

	return dockermgm, nil
}

func (h *TaskHandler) LoadRoutes() *http.ServeMux {
	router := http.NewServeMux()
	router.HandleFunc("/", h.GetTasks)
	return router
}

func (h *TaskHandler) GetTasks(w http.ResponseWriter, r *http.Request) {

	tasks, err := h.queries.FindAll(r.Context())
	if err != nil {
		h.logger.Error(err.Error())
		http.Error(w, "Failed to list cron jobs", http.StatusBadRequest)
		return
	}

	tasksDTO := make([]TaskDTO, len(tasks))
	for i, task := range tasks {
		tasksDTO[i] = TaskToDTO(task)
	}

	w.WriteHeader(http.StatusOK)
	if err := json.NewEncoder(w).Encode(tasksDTO); err != nil {
		h.logger.Error(err.Error())
		http.Error(w, "Failed to encode response", http.StatusInternalServerError)
	}
}
