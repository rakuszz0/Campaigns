package middleware

import (
	"context"
	"encoding/json"
	"net/http"
	"strings"

	dto "Zakat/dto/result"

	jwtToken "Zakat/pkg/jwt"
)

// Auth is a middleware that checks for a valid JWT token.
func Auth(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")

		// Get Authorization header
		authHeader := r.Header.Get("Authorization")
		if authHeader == "" {
			w.WriteHeader(http.StatusUnauthorized)
			json.NewEncoder(w).Encode(dto.ErrorResult{
				Code:    http.StatusUnauthorized,
				Message: "Authorization header missing",
			})
			return
		}

		// Check for Bearer format
		splitToken := strings.Split(authHeader, " ")
		if len(splitToken) != 2 || strings.ToLower(splitToken[0]) != "bearer" {
			w.WriteHeader(http.StatusUnauthorized)
			json.NewEncoder(w).Encode(dto.ErrorResult{
				Code:    http.StatusUnauthorized,
				Message: "Invalid token format",
			})
			return
		}

		token := splitToken[1]

		// Decode and validate token
		claims, err := jwtToken.DecodeToken(token)
		if err != nil {
			w.WriteHeader(http.StatusUnauthorized)
			json.NewEncoder(w).Encode(dto.ErrorResult{
				Code:    http.StatusUnauthorized,
				Message: "Invalid or expired token",
			})
			return
		}

		// Inject user claims into context
		type contextKey string
		const userInfoKey contextKey = "userInfo"
		ctx := context.WithValue(r.Context(), userInfoKey, claims)
		next.ServeHTTP(w, r.WithContext(ctx))
	}
}
