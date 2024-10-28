package dockermanagement

import (
	backer_errors "backbacker/errors"
	"context"
	"encoding/json"
	"log/slog"
	"net/http"

	"github.com/docker/docker/api/types/container"
	"github.com/docker/docker/client"
)

type DockerMgm struct {
	logger       *slog.Logger
	dockerClient *client.Client
	Handler      *http.ServeMux
}

func New(logger *slog.Logger, ctx context.Context) (*DockerMgm, error) {
	cli, err := client.NewClientWithOpts(client.FromEnv, client.WithAPIVersionNegotiation())
	if err != nil {
		logger.Error("Failed to connect to Docker daemon")
		return nil, err
	}

	cli.NegotiateAPIVersion(ctx)

	router := http.NewServeMux()

	dockermgm := &DockerMgm{
		logger:       logger,
		dockerClient: cli,
		Handler:      router,
	}

	dockermgm.loadRoutes()

	return dockermgm, nil
}

func (h *DockerMgm) loadRoutes() {
	h.Handler.HandleFunc("/", h.GetContainers)
}

func (h *DockerMgm) GetContainers(w http.ResponseWriter, r *http.Request) {

	containers, err := h.dockerClient.ContainerList(r.Context(), container.ListOptions{
		All: true,
	})

	if err != nil {
		h.logger.Error(err.Error())

		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(backer_errors.BackerError{
			Code:    1001,
			Message: "Failed to list containers",
		})
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(containers)
}
