package database

import (
	"database/sql"
	"errors"
	"fmt"
	"io/fs"
	"log/slog"
	"os"

	"github.com/golang-migrate/migrate/v4"
	"github.com/golang-migrate/migrate/v4/database/sqlite"
	_ "github.com/golang-migrate/migrate/v4/source/file"

	_ "modernc.org/sqlite"
)

func Connect(logger *slog.Logger, migrations fs.FS) (*sql.DB, error) {
	dbPath := os.Getenv("CRONTAINER_DB_PATH")
	if dbPath == "" {
		return nil, fmt.Errorf("environment variable CRONTAINER_DB_PATH is not set")
	}

	db, err := sql.Open("sqlite", dbPath)

	if err != nil {
		return nil, err
	}

	err = applyMigrations(db, logger)
	if err != nil {
		return nil, err
	}

	return db, nil
}

func applyMigrations(db *sql.DB, logger *slog.Logger) error {
	logger.Info("Applying migrations")

	driver, err := sqlite.WithInstance(db, &sqlite.Config{
		NoTxWrap: true,
	})
	if err != nil {
		return err
	}

	migrator, err := migrate.NewWithDatabaseInstance("file://migrations", "sqlite3", driver)
	if err != nil {
		return err
	}

	err = migrator.Up()
	if err != nil && !errors.Is(err, migrate.ErrNoChange) {
		return err
	}

	logger.Info("Migrations applied successfully")
	return nil
}
