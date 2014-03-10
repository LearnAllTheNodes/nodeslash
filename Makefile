FILES = $(shell find test -name "*Test.js")

test:
		@echo $(FILES)
			@NODE_ENV=test ./node_modules/.bin/mocha $(FILES)

.PHONY: test
