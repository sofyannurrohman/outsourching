# Build Stage
FROM golang:1.25-alpine AS builder

WORKDIR /app

# Install build dependencies
RUN apk add --no-cache gcc musl-dev

# Copy dependency files
COPY go.mod go.sum ./
RUN go mod download

# Copy source code
COPY . .

# Build the application
RUN CGO_ENABLED=0 GOOS=linux go build -o main ./cmd/server/main.go

# Production Stage
FROM alpine:latest

WORKDIR /app

# Add certificates and timezone data
RUN apk --no-cache add ca-certificates tzdata

# Copy binary and migrations from builder
COPY --from=builder /app/main .
COPY --from=builder /app/migrations ./migrations


# Expose port
EXPOSE 8080

# Run the binary
CMD ["./main"]
