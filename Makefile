.ONESHELL:

.PHONY: all
all: build

.PHONY: build
build:
	docker build . -t openbank/demo:v1

.PHONY: run
run:
	docker run -ti \
		-v /sys/fs/cgroup:/sys/fs/cgroup:ro \
		--privileged=true \
		--tmpfs /run \
		--tmpfs /tmp \
		--stop-signal SIGTERM \
		--security-opt seccomp:unconfined \
		-e container=docker openbank/demo:v1 /lib/systemd/systemd
