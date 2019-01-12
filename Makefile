.ONESHELL:

.PHONY: all
all: build run

.PHONY: build
build:
	docker build . -t openbank/demo:v1

.PHONY: run
run:
	@(docker rm -f $$(docker ps -a --filter="name=openbank_demo" -q) &> /dev/null || :)
	@(docker exec -it $$(\
		docker run -dti \
			--name=openbank_demo \
			-v /sys/fs/cgroup:/sys/fs/cgroup:ro \
			-v $$(pwd)/data:/data \
			-v $$(pwd)/ui/build:/var/www \
			-p 443:443 \
			-p 80:80 \
			--privileged=true \
			--security-opt seccomp:unconfined \
		openbank/demo:v1 \
	) bash || :)
	@(docker rm -f $$(docker ps -a --filter="name=openbank_demo" -q) &> /dev/null || :)
