export ARCH = $(shell uname -m | sed 's/x86_64/amd64/' | sed 's/aarch64/arm64/')

.ONESHELL:
.PHONY: arm64
.PHONY: amd64

.PHONY: all
all: bootstrap run

.PHONY: bootstrap
bootstrap:
	@docker compose pull
	@docker compose build
	@sh make-secrets.sh

.PHONY: run
run:
	@docker compose up --build --force-recreate --abort-on-container-exit
