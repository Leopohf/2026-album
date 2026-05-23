package main

import (
	"album-api/internal/handler"
	"github.com/aws/aws-lambda-go/lambda"
)

func main() {
	lambda.Start(handler.HandleRequest)
}
