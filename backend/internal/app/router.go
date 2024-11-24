package app

import (
	"context"
	"net/http"

	"github.com/simpros/crontainer/internal/handler/containerhandler"
	"github.com/simpros/crontainer/internal/handler/cronhandler"
	"github.com/simpros/crontainer/internal/middleware"
	"github.com/simpros/crontainer/repository"
)

func (a *App) loadRoutes(ctx context.Context) (http.Handler, error) {

	router := http.NewServeMux()

	dockermgm, err := containerhandler.New(a.logger, ctx)
	if err != nil {
		a.logger.Error(err.Error())
		panic(err)
	}
	router.Handle("/containers/", http.StripPrefix("/containers", dockermgm.LoadRoutes()))

	repo := repository.New(a.db)

	cron, err := cronhandler.New(a.logger, repo, ctx)
	if err != nil {
		a.logger.Error(err.Error())
		panic(err)
	}
	router.Handle("/cron/", http.StripPrefix("/cron", cron.LoadRoutes()))

	chain := middleware.Chain(
		middleware.Logging(a.logger),
		middleware.HandleCors(),
	)

	return chain(router), nil
}
