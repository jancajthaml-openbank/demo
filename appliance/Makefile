ARCH := $(shell uname -m | sed 's/x86_64/amd64/' | sed 's/aarch64/arm64/')

export COMPOSE_DOCKER_CLI_BUILD = 1
export DOCKER_BUILDKIT = 1
export COMPOSE_PROJECT_NAME = demo

.ONESHELL:

.PHONY: all
all: build run

.PHONY: build
build: compile package

.PHONY: upgrade
upgrade:
	@cd ui && npm run upgrade

.PHONY: compile
compile:
	@cd ui && npm run build

.PHONY: package
package:
	@ARCH=$(ARCH) docker-compose build --pull demo
	@ARCH=$(ARCH) docker-compose build --pull postgres
	@ARCH=$(ARCH) docker-compose build --pull metrics

.PHONY: run
run:
	@ARCH=$(ARCH) docker-compose down --remove-orphans
	@ARCH=$(ARCH) docker-compose up --abort-on-container-exit demo
