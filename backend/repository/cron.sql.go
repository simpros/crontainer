// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.27.0
// source: cron.sql

package repository

import (
	"context"
)

const findAll = `-- name: FindAll :many
SELECT id, name, schedule, command, created_at, updated_at FROM cron_jobs
`

func (q *Queries) FindAll(ctx context.Context) ([]CronJob, error) {
	rows, err := q.db.QueryContext(ctx, findAll)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []CronJob
	for rows.Next() {
		var i CronJob
		if err := rows.Scan(
			&i.ID,
			&i.Name,
			&i.Schedule,
			&i.Command,
			&i.CreatedAt,
			&i.UpdatedAt,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Close(); err != nil {
		return nil, err
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const findByID = `-- name: FindByID :one
SELECT id, name, schedule, command, created_at, updated_at FROM cron_jobs WHERE id = ?
`

func (q *Queries) FindByID(ctx context.Context, id int64) (CronJob, error) {
	row := q.db.QueryRowContext(ctx, findByID, id)
	var i CronJob
	err := row.Scan(
		&i.ID,
		&i.Name,
		&i.Schedule,
		&i.Command,
		&i.CreatedAt,
		&i.UpdatedAt,
	)
	return i, err
}

const findByName = `-- name: FindByName :one
SELECT id, name, schedule, command, created_at, updated_at FROM cron_jobs WHERE name = ?
`

func (q *Queries) FindByName(ctx context.Context, name string) (CronJob, error) {
	row := q.db.QueryRowContext(ctx, findByName, name)
	var i CronJob
	err := row.Scan(
		&i.ID,
		&i.Name,
		&i.Schedule,
		&i.Command,
		&i.CreatedAt,
		&i.UpdatedAt,
	)
	return i, err
}

const updateName = `-- name: UpdateName :exec
UPDATE cron_jobs SET name = ? WHERE id = ?
`

type UpdateNameParams struct {
	Name string
	ID   int64
}

func (q *Queries) UpdateName(ctx context.Context, arg UpdateNameParams) error {
	_, err := q.db.ExecContext(ctx, updateName, arg.Name, arg.ID)
	return err
}
