package app

import (
	"context"
	"net/http"

	containerhandler "github.com/simpros/crontainer/internal/handler/container"
	taskhandler "github.com/simpros/crontainer/internal/handler/task"
	"github.com/simpros/crontainer/internal/middleware"
	"github.com/simpros/crontainer/repository"
)

func (a *App) loadRoutes(ctx context.Context) (http.Handler, error) {

	router := http.NewServeMux()

	router.Handle("GET /health", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
	}))

	dockermgm, err := containerhandler.New(a.logger, ctx)
	if err != nil {
		a.logger.Error(err.Error())
		panic(err)
	}
	router.Handle("/container/", http.StripPrefix("/container", dockermgm.LoadRoutes()))

	repo := repository.New(a.db)

	task, err := taskhandler.New(a.logger, repo, ctx)
	if err != nil {
		a.logger.Error(err.Error())
		panic(err)
	}
	router.Handle("/task/", http.StripPrefix("/task", task.LoadRoutes()))

	chain := middleware.Chain(
		middleware.Logging(a.logger),
		middleware.HandleCors(),
	)

	return chain(router), nil
}
