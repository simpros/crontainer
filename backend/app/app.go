package app

import (
	"backbacker/database"
	"backbacker/middleware"
	"context"
	"database/sql"
	"errors"
	"log/slog"
	"net/http"
	"time"
)

type App struct {
	logger *slog.Logger
	router *http.ServeMux
	db     *sql.DB
}

func New(logger *slog.Logger) *App {
	router := http.NewServeMux()

	app := &App{
		logger: logger,
		router: router,
	}

	return app
}

func (a *App) Start(ctx context.Context) error {
	db, err := database.Connect()
	if err != nil {
		return err
	}

	a.db = db
	a.loadRoutes(ctx)

	server := http.Server{
		Addr:    "0.0.0.0:8080",
		Handler: middleware.Logging(a.logger, middleware.HandleBadCode(middleware.HandleCors(a.router))),
	}

	done := make(chan struct{})

	go func() {
		err := server.ListenAndServe()
		if err != nil && !errors.Is(err, http.ErrServerClosed) {

			a.logger.Error("Failed to start server", slog.Any("error", err))
		}

		close(done)

	}()

	a.logger.Info("Server listening", slog.String("addr", ":8080"))

	select {
	case <-done:
		break
	case <-ctx.Done():
		ctx, cancel := context.WithTimeout(context.Background(), time.Second*30)
		server.Shutdown(ctx)
		cancel()
	}

	return nil
}
