package taskhandler

import (
	"context"
	"log/slog"
	"net/http"
	"strconv"

	"github.com/simpros/crontainer/internal/errors"
	"github.com/simpros/crontainer/internal/handler"
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
	router.HandleFunc("GET /", h.GetTasks)
	router.HandleFunc("GET /{id}", h.GetTask)
	router.HandleFunc("POST /", h.CreateTask)
	return router
}

func (h *TaskHandler) GetTasks(w http.ResponseWriter, r *http.Request) {

	tasks, err := h.queries.FindAll(r.Context())
	if err != nil {
		h.logger.Error(err.Error())
		errors.WriteErrorResponse(w, err)
		return
	}

	tasksDTO := make([]TaskDTO, len(tasks))
	for i, task := range tasks {
		tasksDTO[i] = ParseTaskToDTO(task)
	}

	response := handler.NewCrontainerResponse(200, tasksDTO)
	handler.WriteCrontainerResponse(w, response)
}

func (h *TaskHandler) GetTask(w http.ResponseWriter, r *http.Request) {
	idStr := r.URL.Path[len("/"):]

	id, err := strconv.ParseInt(idStr, 10, 64)
	if err != nil {
		errors.WriteErrorResponse(w, err)
		return
	}

	task, err := h.queries.FindByID(r.Context(), id)
	if err != nil {
		h.logger.Error(err.Error())
		errors.WriteErrorResponse(w, err)
		return
	}

	taskDTO := handler.NewCrontainerResponse(200, ParseTaskToDTO(task))
	handler.WriteCrontainerResponse(w, taskDTO)
}

func (h *TaskHandler) CreateTask(w http.ResponseWriter, r *http.Request) {
	r.ParseForm()
	createTask, err := ParseFormToCreateTaskParams(r.Form)

	if err != nil {
		errors.WriteErrorResponse(w, err)
		return
	}

	task, err := h.queries.CreateTask(r.Context(), createTask)
	if err != nil {
		h.logger.Error(err.Error())
		errors.WriteErrorResponse(w, err)
		return
	}

	response := handler.NewCrontainerResponse(201, task)
	handler.WriteCrontainerResponse(w, response)
}
