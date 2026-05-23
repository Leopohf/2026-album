package main

import (
	"album-api/internal/handler"
	"context"
	"fmt"
	"io"
	"log"
	"net/http"
	"github.com/aws/aws-lambda-go/events"
)

func main() {
	port := ":8080"
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		body, _ := io.ReadAll(r.Body)
		
		// Map standard HTTP request to APIGatewayProxyRequest
		lambdaRequest := events.APIGatewayProxyRequest{
			Path:       r.URL.Path,
			HTTPMethod: r.Method,
			Body:       string(body),
			Headers:    make(map[string]string),
		}
		for k, v := range r.Header {
			if len(v) > 0 {
				lambdaRequest.Headers[k] = v[0]
			}
		}

		// Call the common handler
		resp, err := handler.HandleRequest(context.Background(), lambdaRequest)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		// Map APIGatewayProxyResponse back to standard HTTP response
		for k, v := range resp.Headers {
			w.Header().Set(k, v)
		}
		w.WriteHeader(resp.StatusCode)
		w.Write([]byte(resp.Body))
	})

	fmt.Printf("Local server running on http://localhost%s\n", port)
	log.Fatal(http.ListenAndServe(port, nil))
}
