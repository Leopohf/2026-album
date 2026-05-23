package handler

import (
	"context"
	"github.com/aws/aws-lambda-go/events"
)

// HandleRequest processes the incoming API Gateway request and returns a response.
func HandleRequest(ctx context.Context, request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	return events.APIGatewayProxyResponse{
		StatusCode: 200,
		Body:       "Hello from Album API (Go)!",
		Headers: map[string]string{
			"Content-Type": "application/json",
		},
	}, nil
}
