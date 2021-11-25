ARCH := $(shell uname -m | sed 's/x86_64/amd64/' | sed 's/aarch64/arm64/')

export COMPOSE_DOCKER_CLI_BUILD = 1
export DOCKER_BUILDKIT = 1
export COMPOSE_PROJECT_NAME = demo

.ONESHELL:

.PHONY: all
all: bootstrap build run

.PHONY: bootstrap
bootstrap:
	@ARCH=$(ARCH) docker-compose build node
	@ARCH=$(ARCH) docker-compose run --rm ui-sync

.PHONY: build
build:
	@ARCH=$(ARCH) docker-compose run --rm ui-build
	@ARCH=$(ARCH) docker-compose build --pull demo
	@ARCH=$(ARCH) docker-compose build --pull postgres
	@ARCH=$(ARCH) docker-compose build --pull metrics

.PHONY: dev
dev:
	@ARCH=$(ARCH) docker-compose down --remove-orphans
	@ARCH=$(ARCH) docker-compose up --abort-on-container-exit ui-development

.PHONY: run
run:
	@ARCH=$(ARCH) docker-compose down --remove-orphans
	@ARCH=$(ARCH) docker-compose up --abort-on-container-exit demo
