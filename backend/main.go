package main

import (
	"context"
	"embed"
	"log/slog"
	"os"
	"os/signal"

	"github.com/joho/godotenv"
	"github.com/simpros/crontainer/internal/app"
)

//go:embed migrations/*.sql
var files embed.FS

func main() {
	godotenv.Load()

	logger := slog.New(slog.NewJSONHandler(os.Stdout, nil))
	ctx, cancel := signal.NotifyContext(context.Background(), os.Interrupt)
	defer cancel()

	a := app.New(app.Config{}, logger, files)

	if err := a.Start(ctx); err != nil {
		logger.Error("failed to start server", slog.Any("error", err))
	}
}
