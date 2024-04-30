CREATE DATABASE dbtodo;

CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY, --*auto increment
    description VARCHAR(255)
);