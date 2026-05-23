.PHONY: build run clean

BINARY_NAME=bootstrap
ZIP_NAME=bootstrap.zip

build:
	GOOS=linux GOARCH=arm64 go build -o $(BINARY_NAME) cmd/api/main.go
	zip $(ZIP_NAME) $(BINARY_NAME)
	rm $(BINARY_NAME)

run:
	go run cmd/local/main.go

clean:
	rm -f $(BINARY_NAME) $(ZIP_NAME)
