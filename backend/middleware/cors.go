package middleware

import (
	"net/http"
	"strings"
)

func HandleCors(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		if strings.HasPrefix(r.Host, "localhost") {
			w.Header().Set("Access-Control-Allow-Origin", "*")
		}

		next.ServeHTTP(w, r)
	})
}
