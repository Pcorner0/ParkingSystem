# ParkingSystem
El presente proyecto buscó inplementar un sistema basico de contról de cajones de estacionamiento.

Se plantó utilizar lenguaje Golang para la construcción del BackEnd, con el uso del Framework Gin para agilizar su construcción así como la libreria CORS gin's middleware para permitir la interacción del BackEnd y FrontEnd por el navegador.

El FrontEnd se diseñó usando la librería React como eje principal, así como Axios para poder hacer solicitudes al BackEnd
Para poder hacer uso del Sistema es necesario instalar y lanzar los servidores tanto del BACKEND como FRONTEND.

## Instalación

```bash
$ git clone git@github.com:Pcorner0/ParkingSystem.git
$ cd ParkingSystem
```
Se recomienda habilitar 2 terminales:

- Terminal Backend
```bash
$ cd api
$ go mod tidy
$ go run ./main.go
```

- Terminal FrontEnd
```bash
$ cd client
$ npm install
$ npm run dev
```
