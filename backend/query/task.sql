-- name: FindAll :many
SELECT * FROM tasks;

-- name: FindByID :one
SELECT * FROM tasks WHERE id = ?;

-- name: FindByName :one
SELECT * FROM tasks WHERE name = ?;

-- name: UpdateName :exec
UPDATE tasks SET name = ? WHERE id = ?;

-- name: CreateTask :one
INSERT INTO tasks (name, command) VALUES (?, ?) RETURNING *;