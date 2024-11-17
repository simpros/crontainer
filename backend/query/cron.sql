-- name: FindAll :many
SELECT * FROM cron_jobs;

-- name: FindByID :one
SELECT * FROM cron_jobs WHERE id = ?;

-- name: FindByName :one
SELECT * FROM cron_jobs WHERE name = ?;

-- name: UpdateName :exec
UPDATE cron_jobs SET name = ? WHERE id = ?;