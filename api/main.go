package main

import (

	"github.com/Pcorner0/ParkingSystem/controllers"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	router.Use(cors.Default())

	router.POST("/createparking", controllers.CreateParking)

	router.GET("/getdata", controllers.GetData)

	router.POST("/entrada", controllers.UpdateData)

	router.PUT("/salida", controllers.Salida)

	router.Run(":8080")

}
