package cronhandler

import (
	backer_errors "crontainer/errors"
	"crontainer/repository"
	"context"
	"encoding/json"
	"log/slog"
	"net/http"
)

type CronHandler struct {
	logger  *slog.Logger
	queries *repository.Queries
	Handler *http.ServeMux
}

func New(logger *slog.Logger, queries *repository.Queries, ctx context.Context) (*CronHandler, error) {

	router := http.NewServeMux()

	dockermgm := &CronHandler{
		logger:  logger,
		queries: queries,
		Handler: router,
	}

	dockermgm.loadRoutes()

	return dockermgm, nil
}

func (h *CronHandler) loadRoutes() {
	h.Handler.HandleFunc("/", h.GetCronJobs)
}

func (h *CronHandler) GetCronJobs(w http.ResponseWriter, r *http.Request) {

	cronJobs, err := h.queries.FindAll(r.Context())
	if err != nil {
		h.logger.Error(err.Error())

		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(backer_errors.BackerError{
			Code:    1001,
			Message: "Failed to list cron jobs",
		})
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(cronJobs)
}
