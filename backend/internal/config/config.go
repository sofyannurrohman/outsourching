package config

import (
	"log"
	"os"
	"strconv"

	"github.com/joho/godotenv"
)

type Config struct {
	AppEnv            string
	Port              string
	DBHost            string
	DBPort            string
	DBUser            string
	DBPassword        string
	DBName            string
	DBSSLMode         string
	RedisURL          string
	JWTSecret         string
	JWTExpiryHours    int
	UploadDir         string
	MaxUploadSize     int64
	CORSAllowedOrigins string
	SMTPHost          string
	SMTPPort          string
	SMTPUser          string
	SMTPPass          string
	SMTPFrom          string
}

func (c *Config) DSN() string {
	return "host=" + c.DBHost +
		" port=" + c.DBPort +
		" user=" + c.DBUser +
		" password=" + c.DBPassword +
		" dbname=" + c.DBName +
		" sslmode=" + c.DBSSLMode +
		" TimeZone=Asia/Jakarta"
}

func (c *Config) MigrationDSN() string {
	return "postgres://" + c.DBUser + ":" + c.DBPassword +
		"@" + c.DBHost + ":" + c.DBPort +
		"/" + c.DBName + "?sslmode=" + c.DBSSLMode
}

func Load() *Config {
	if err := godotenv.Load(); err != nil {
		log.Println("Warning: .env file not found, using system environment variables")
	}

	jwtExpiry, _ := strconv.Atoi(getEnv("JWT_EXPIRY_HOURS", "24"))
	maxUpload, _ := strconv.ParseInt(getEnv("MAX_UPLOAD_SIZE", "5242880"), 10, 64)

	return &Config{
		AppEnv:            getEnv("APP_ENV", "development"),
		Port:              getEnv("APP_PORT", "8080"),
		DBHost:            getEnv("DB_HOST", "localhost"),
		DBPort:            getEnv("DB_PORT", "5432"),
		DBUser:            getEnv("DB_USER", "outsource"),
		DBPassword:        getEnv("DB_PASSWORD", "outsource"),
		DBName:            getEnv("DB_NAME", "outsource_db"),
		DBSSLMode:         getEnv("DB_SSLMODE", "disable"),
		RedisURL:          getEnv("REDIS_URL", "redis://"+getEnv("REDIS_HOST", "localhost")+":"+getEnv("REDIS_PORT", "6379")),
		JWTSecret:         getEnv("JWT_SECRET", "outsourcehub_dev_secret_change_in_production_2026"),
		JWTExpiryHours:    jwtExpiry,
		UploadDir:         getEnv("UPLOAD_DIR", "./uploads"),
		MaxUploadSize:     maxUpload,
		CORSAllowedOrigins: getEnv("CORS_ALLOWED_ORIGINS", "http://localhost:3000"),
		SMTPHost:          getEnv("SMTP_HOST", ""),
		SMTPPort:          getEnv("SMTP_PORT", "587"),
		SMTPUser:          getEnv("SMTP_USER", ""),
		SMTPPass:          getEnv("SMTP_PASS", ""),
		SMTPFrom:          getEnv("SMTP_FROM", "noreply@outsourcehub.com"),
	}
}

func getEnv(key, fallback string) string {
	if value, exists := os.LookupEnv(key); exists {
		return value
	}
	return fallback
}
