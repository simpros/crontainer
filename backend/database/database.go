package database

import (
	"database/sql"
	"errors"
	"fmt"
	"os"

	"github.com/golang-migrate/migrate/v4"
	"github.com/golang-migrate/migrate/v4/database/sqlite"

	_ "github.com/golang-migrate/migrate/v4/source/file"
	_ "modernc.org/sqlite"
)

func Connect() (*sql.DB, error) {
	dbPath := os.Getenv("CRONTAINER_DB_PATH")
	if dbPath == "" {
		return nil, fmt.Errorf("environment variable CRONTAINER_DB_PATH is not set")
	}

	db, err := sql.Open("sqlite", dbPath)

	if err != nil {
		return nil, err
	}

	return db, nil
}

func ApplyMigrations(db *sql.DB) error {
	driver, err := sqlite.WithInstance(db, &sqlite.Config{
		NoTxWrap: true,
	})
	if err != nil {
		return err
	}

	m, err := migrate.NewWithDatabaseInstance("file://migrations", "sqlite3", driver)
	if err != nil {
		return err
	}

	err = m.Up()
	if err != nil && !errors.Is(err, migrate.ErrNoChange) {
		return err
	}
	return nil
}
