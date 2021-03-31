
export COMPOSE_DOCKER_CLI_BUILD = 1
export DOCKER_BUILDKIT = 1
export COMPOSE_PROJECT_NAME = demo

.ONESHELL:

.PHONY: all
all: build run

.PHONY: build
build:
	@docker-compose build --pull demo
	@docker-compose build --pull postgres
	@docker-compose build --pull metrics

.PHONY: run
run:
	@docker-compose down --remove-orphans
	@docker-compose up --abort-on-container-exit demo
