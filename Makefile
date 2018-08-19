.ONESHELL:

.PHONY: all
all: build run

.PHONY: build
build:
	docker build . -t openbank/demo:v1

.PHONY: run
run:
	docker exec -it $$(\
		docker run -dti \
			-v /sys/fs/cgroup:/sys/fs/cgroup:ro \
			-p 5562:5562 \
			-p 5561:5561 \
			-p 443:443 \
			--privileged=true \
			--security-opt seccomp:unconfined \
		openbank/demo:v1 \
	) bash
