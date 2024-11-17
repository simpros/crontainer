package app

import (
	"crontainer/handler/containerhandler"
	"crontainer/handler/cronhandler"
	"context"
	"net/http"
)

func (a *App) loadRoutes(ctx context.Context) {
	// files := http.FileServer(http.Dir("./static"))
	// a.router.Handle("GET /static/", http.StripPrefix("/static", files))
	dockermgm, err := containerhandler.New(a.logger, ctx)
	if err != nil {
		a.logger.Error(err.Error())
		panic(err)
	}
	a.router.Handle("/containers/", http.StripPrefix("/containers", dockermgm.Handler))

	cron, err := cronhandler.New(a.logger, a.queries, ctx)
	if err != nil {
		a.logger.Error(err.Error())
		panic(err)
	}
	a.router.Handle("/cron/", http.StripPrefix("/cron", cron.Handler))

}
