package app

import (
	"context"
	"database/sql"
	"errors"
	"fmt"
	"io/fs"
	"log/slog"
	"net/http"
	"time"

	"github.com/simpros/crontainer/internal/database"
)

type App struct {
	config Config
	logger *slog.Logger
	files  fs.FS
	db     *sql.DB
}

func New(config Config, logger *slog.Logger, files fs.FS) *App {
	return &App{
		config: config,
		logger: logger,
		files:  files,
	}
}

func (a *App) Start(ctx context.Context) error {
	db, err := database.Connect(a.logger, a.files)
	if err != nil {
		return fmt.Errorf("failed to connect to database: %w", err)
	}

	a.db = db

	router, err := a.loadRoutes(ctx)
	if err != nil {
		return fmt.Errorf("failed when loading routes: %w", err)
	}

	port := 8080
	srv := &http.Server{
		Addr:    fmt.Sprintf(":%d", port),
		Handler: router,
	}

	errCh := make(chan error, 1)

	go func() {
		err := srv.ListenAndServe()
		if err != nil && !errors.Is(err, http.ErrServerClosed) {
			errCh <- fmt.Errorf("failed to listen and serve: %w", err)
		}

		close(errCh)
	}()

	a.logger.Info("server running", slog.Int("port", port))

	select {
	// Wait until we receive SIGINT (ctrl+c on cli)
	case <-ctx.Done():
		break
	case err := <-errCh:
		return err
	}

	sCtx, cancel := context.WithTimeout(context.Background(), time.Second*15)
	defer cancel()

	a.db.Close()
	srv.Shutdown(sCtx)

	return nil
}
