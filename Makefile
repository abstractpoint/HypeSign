all: build

build:
	docker build -t sign .

run:
	docker run --rm -it sign bash

test:
	@./node_modules/.bin/mocha


.PHONY: all build run test
