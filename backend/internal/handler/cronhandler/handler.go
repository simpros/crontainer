package cronhandler

import (
	"context"
	"encoding/json"
	"log/slog"
	"net/http"

	"github.com/simpros/crontainer/internal/errors"
	"github.com/simpros/crontainer/repository"
)

type CronHandler struct {
	logger  *slog.Logger
	queries *repository.Queries
}

func New(logger *slog.Logger, queries *repository.Queries, ctx context.Context) (*CronHandler, error) {
	dockermgm := &CronHandler{
		logger:  logger,
		queries: queries,
	}

	return dockermgm, nil
}

func (h *CronHandler) LoadRoutes() *http.ServeMux {
	router := http.NewServeMux()
	router.HandleFunc("/", h.GetCronJobs)
	return router
}

func (h *CronHandler) GetCronJobs(w http.ResponseWriter, r *http.Request) {

	cronJobs, err := h.queries.FindAll(r.Context())
	if err != nil {
		h.logger.Error(err.Error())

		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(errors.CrontainerError{
			Code:    1001,
			Message: "Failed to list cron jobs",
		})
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(cronJobs)
}
