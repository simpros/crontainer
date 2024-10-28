package app

import (
	dockermanagement "backbacker/docker-management"
	"context"
	"net/http"
)

func (a *App) loadRoutes(ctx context.Context) {
	dockermgm, err := dockermanagement.New(a.logger, ctx)

	if err != nil {
		a.logger.Error(err.Error())
		panic(err)
	}

	// files := http.FileServer(http.Dir("./static"))
	// a.router.Handle("GET /static/", http.StripPrefix("/static", files))

	a.router.Handle("/containers/", http.StripPrefix("/containers", dockermgm.Handler))
}
