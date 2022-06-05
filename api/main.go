package main

import (
	"time"

	"github.com/Pcorner0/ParkingSystem/controllers"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"PUT", "PATCH", "POST", "GET", "DELETE"},
		AllowHeaders:     []string{"Origin"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		AllowOriginFunc: func(origin string) bool {
			return origin == "https://localhost:3000"
		},
		MaxAge: 12 * time.Hour,
	}))

	router.POST("/createparking", controllers.CreateParking)

	router.GET("/getdata", controllers.GetData)

	router.PUT("/entrada", controllers.UpdateData)

	router.PUT("/salida", controllers.Salida)

	router.Run(":8080")

}
