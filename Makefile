all: build

build:
	docker build -t sign .

run:
	docker run --rm -it sign bash

test:
	@./node_modules/.bin/mocha

start:
	docker run -d --restart=always --name sign sign

stop:
	@docker rm -vf sign ||:

.PHONY: all build run test start stop
