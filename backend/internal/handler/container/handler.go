package containerhandler

import (
	"context"
	"log/slog"
	"net/http"

	"github.com/docker/docker/api/types/container"
	"github.com/docker/docker/client"
	"github.com/simpros/crontainer/internal/handler"
)

type DockerMgm struct {
	logger       *slog.Logger
	dockerClient *client.Client
}

func New(logger *slog.Logger, ctx context.Context) (*DockerMgm, error) {
	cli, err := client.NewClientWithOpts(client.FromEnv, client.WithAPIVersionNegotiation())
	if err != nil {
		logger.Error("Failed to connect to Docker daemon")
		return nil, err
	}

	cli.NegotiateAPIVersion(ctx)

	dockermgm := &DockerMgm{
		logger:       logger,
		dockerClient: cli,
	}

	return dockermgm, nil
}

func (h *DockerMgm) LoadRoutes() *http.ServeMux {
	router := http.NewServeMux()

	router.HandleFunc("GET /", h.GetContainers)

	return router
}

func (h *DockerMgm) GetContainers(w http.ResponseWriter, r *http.Request) {

	containers, err := h.dockerClient.ContainerList(r.Context(), container.ListOptions{
		All: true,
	})

	if err != nil {
		h.logger.Error(err.Error())
		handler.WriteErrorResponse(w, err)
		return
	}

	response := handler.NewCrontainerResponse(200, containers)
	handler.WriteCrontainerResponse(w, response)
}
