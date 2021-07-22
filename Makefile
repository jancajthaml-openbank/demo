ARCH := $(shell uname -m | sed 's/x86_64/amd64/' | sed 's/aarch64/arm64/')

export COMPOSE_DOCKER_CLI_BUILD = 1
export DOCKER_BUILDKIT = 1
export COMPOSE_PROJECT_NAME = demo

.ONESHELL:

.PHONY: all
all: build run

.PHONY: build
build:
	@cd ui/spa && npm run build
	@ls -1 ui/modules | xargs -r -I {} bash -c 'cd ui/modules/{} && npm run build'
	@ARCH=$(ARCH) docker-compose build --pull demo
	@ARCH=$(ARCH) docker-compose build --pull postgres
	@ARCH=$(ARCH) docker-compose build --pull metrics

.PHONY: run
run:
	@ARCH=$(ARCH) docker-compose down --remove-orphans
	@ARCH=$(ARCH) docker-compose up --abort-on-container-exit demo
