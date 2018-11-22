.PHONY: clean install build deploy

clean:
	rm -rf build && \
	rm -rf node_modules

install:
	npm install

build: 
	npm run build

deploy:
	npm start