package main

import (
	"github.com/Pcorner0/ParkingSystem/controllers"
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	router.POST("/createparking", controllers.CreateParking)

	router.GET("/getdata", controllers.GetData)

	router.PUT("/entrada", controllers.UpdateData)

	router.PUT("/salida", controllers.Salida)

	router.Run(":8080")

}
