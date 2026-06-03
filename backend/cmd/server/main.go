package main

import (
	"log"
	"net/http"

	"github.com/outsourcehub/backend/internal/config"
	"github.com/outsourcehub/backend/internal/database"
	"github.com/outsourcehub/backend/internal/handler"
)

func main() {
	// Loading configuration
	cfg := config.Load()

	// Connect to database
	db := config.ConnectDB(cfg)

	// Connect to Redis
	rdb := config.ConnectRedis(cfg)

	// Run migrations
	if err := database.RunMigrations(cfg.MigrationDSN()); err != nil {
		log.Fatalf("Failed to run migrations: %v", err)
	}

	log.Println("Database connection is ready")
	log.Println("Redis connection is ready")

	// Setup Router
	r := handler.NewRouter(cfg, db, rdb)

	// Start server
	log.Printf("Server starting on :%s", cfg.Port)
	if err := http.ListenAndServe(":"+cfg.Port, r); err != nil {
		log.Fatalf("Server failed to start: %v", err)
	}
}
