package controllers

import (
	"fmt"
	"net/http"

	"github.com/Pcorner0/ParkingSystem/models"

	"github.com/gin-gonic/gin"
)

func GetData(c *gin.Context) {
	var Data models.Parking

	err := models.GetFile(&Data)

	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err})
		return
	}
	fmt.Println(Data.Data)
	c.JSON(http.StatusOK, Data)
}

func CreateParking(c *gin.Context) {

	var Data *models.Parking
	c.BindJSON(&Data)

	models.CreateFile(Data)

	c.JSON(http.StatusOK, Data)

}

func UpdateData(c *gin.Context) {
	var Data *models.Parking
	c.BindJSON(&Data)

	err := models.UpdateFile(Data)
	if err != nil {
		fmt.Println(err)
		c.JSON(http.StatusOK, Data)
		return
	} else {
		c.JSON(http.StatusBadRequest, err)
	}

}

func Salida(c *gin.Context) {
	var Data *models.Parking
	c.BindJSON(&Data)

	err := models.Salida(Data)
	if err != nil {
		fmt.Println(err)
		c.JSON(http.StatusOK, Data)
		return
	} else {
		c.JSON(http.StatusBadRequest, err)
	}

}
