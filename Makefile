.ONESHELL:

.PHONY: all
all: bootstrap build run

.PHONY: bootstrap
bootstrap:
	@docker-compose build node
	@docker-compose run --rm ui-install-dependencies

.PHONY: build
build:
	@docker-compose run --rm ui-build

.PHONY: dev
dev:
	@docker-compose down --remove-orphans
	@docker-compose up ui-development

.PHONY: run
run:
	@docker-compose down --remove-orphans
	@docker-compose up ui-production
