package middleware

import (
	"context"
	"fmt"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/outsourcehub/backend/internal/dto"
	"github.com/redis/go-redis/v9"
)

// RateLimiter implements a Redis sliding-window rate limiter
func RateLimiter(rdb *redis.Client, maxRequests int, window time.Duration) gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx := context.Background()

		// Use user ID if authenticated, otherwise use IP
		var key string
		if userID, exists := c.Get("user_id"); exists {
			key = fmt.Sprintf("rate_limit:user:%s", userID.(string))
		} else {
			key = fmt.Sprintf("rate_limit:ip:%s", c.ClientIP())
		}

		// Increment counter
		count, err := rdb.Incr(ctx, key).Result()
		if err != nil {
			// If Redis is down, allow the request
			c.Next()
			return
		}

		// Set expiry on first request
		if count == 1 {
			rdb.Expire(ctx, key, window)
		}

		// Check limit
		if count > int64(maxRequests) {
			ttl, _ := rdb.TTL(ctx, key).Result()
			c.Header("X-RateLimit-Limit", fmt.Sprintf("%d", maxRequests))
			c.Header("X-RateLimit-Remaining", "0")
			c.Header("Retry-After", fmt.Sprintf("%d", int(ttl.Seconds())))
			dto.RespondError(c, http.StatusTooManyRequests, "RATE_LIMITED", "Too many requests, please try again later")
			c.Abort()
			return
		}

		c.Header("X-RateLimit-Limit", fmt.Sprintf("%d", maxRequests))
		c.Header("X-RateLimit-Remaining", fmt.Sprintf("%d", int64(maxRequests)-count))
		c.Next()
	}
}
