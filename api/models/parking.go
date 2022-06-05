package models

import (
	"encoding/csv"
	"errors"
	"fmt"
	"log"
	"os"
)

type Parking struct {
	Rows int        `json:"rows"`
	Cols int        `json:"cols"`
	Data [][]string `json:"data"`
}

func CreateFile(data *Parking) {

	var parkingSlots = BuildPark(data.Rows, data.Cols)
	csvFile, err := os.Create("DB/database.csv")

	if err != nil {
		log.Fatalf("failed creating file: %s", err)
	}

	csvWrite := csv.NewWriter(csvFile)

	for _, slot := range parkingSlots {
		_ = csvWrite.Write(slot)
	}
	csvWrite.Flush()
	csvFile.Close()
}

func GetFile(data *Parking) error {
	csvFile, err := os.Open("DB/database.csv")
	csvReader := csv.NewReader(csvFile)
	data.Data, err = csvReader.ReadAll()
	data.Cols = len(data.Data[0])
	data.Rows = len(data.Data)

	if err != nil {
		fmt.Println(err)
		return nil
	}

	defer csvFile.Close()

	return err
}

func UpdateFile(data *Parking) error {

	csvFile, err := os.OpenFile("DB/database.csv", os.O_RDWR|os.O_CREATE, 0755)
	defer csvFile.Close()

	if err != nil {
		log.Fatalf("failed creating file: %s", err)
	}

	csvReader := csv.NewReader(csvFile)
	NewVersion, _ := csvReader.ReadAll()

	i := data.Rows
	j := data.Cols

	if CheckAvaibility(i, j, NewVersion) {
		NewVersion[i][j] = "0"

		_ = SaveFile(NewVersion)
		return nil
	} else {
		return errors.New("error al actualizar")
	}
}

func SaveFile(data [][]string) error {
	csvFile, err := os.Create("DB/database.csv")

	if err != nil {
		log.Fatalf("failed opening file: %s", err)
	}

	csvWrite := csv.NewWriter(csvFile)

	for _, slot := range data {
		_ = csvWrite.Write(slot)
	}

	csvWrite.Flush()
	defer csvFile.Close()

	return nil
}

func BuildPark(rows, cols int) [][]string {

	var FinalArray [][]string

	for i := 0; i < rows; i++ {
		//Generar nueva final con n cajones
		var newRow []string
		for j := 0; j < cols; j++ {
			newRow = append(newRow, "1")
		}
		FinalArray = append(FinalArray, newRow)
	}
	return FinalArray
}

func CheckAvaibility(i, j int, data [][]string) bool {

	if (i < 0) || (j < 0) {
		fmt.Println("Valores deben ser positivos")
		return false
	}

	if (i > len(data)) || (j > len(data[0])) {
		fmt.Println("Espacio no existente")
		return false
	}

	fmt.Println(len(data), len(data[0]))
	if data[i][j] == "1" {
		fmt.Println("Espacio disponible")
		return true
	} else {
		fmt.Println("Espacio ocupado")
		return false
	}
}

func Salida(data *Parking) error {

	csvFile, err := os.OpenFile("DB/database.csv", os.O_RDWR|os.O_CREATE, 0755)
	defer csvFile.Close()

	if err != nil {
		log.Fatalf("failed creating file: %s", err)
	}

	csvReader := csv.NewReader(csvFile)
	NewVersion, _ := csvReader.ReadAll()

	i := data.Rows
	j := data.Cols

	if CheckOcupado(i, j, NewVersion) {
		NewVersion[i][j] = "1"

		_ = SaveFile(NewVersion)
		return nil
	} else {
		return errors.New("error al actualizar")
	}
}

func CheckOcupado(i, j int, data [][]string) bool {

	if (i < 0) || (j < 0) {
		fmt.Println("Valores deben ser positivos")
		return false
	}

	if (i > len(data)) || (j > len(data[0])) {
		fmt.Println("Espacio no existente")
		return false
	}

	fmt.Println(len(data), len(data[0]))
	if data[i][j] == "0" {
		fmt.Println("Espacio ocupado")
		return true
	} else {
		fmt.Println("Espacio dispinible")
		return false
	}
}
