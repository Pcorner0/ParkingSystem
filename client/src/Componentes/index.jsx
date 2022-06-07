import React, { Fragment , useEffect, useState} from "react";
import {Container, Row, Col, Card, CardBody, Button} from 'reactstrap';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { Form, FormGroup, Label, Input  } from "reactstrap";

const TableIndex = () => {
    const [data, setData] = useState([]);
    const [data2, setData2] = useState({
        rows: 4,
        cols: 4,
    });
    const [rows, setRows] = useState(0);
    const [cols, setCols] = useState(0);

    const endPointData = "http://localhost:8080/getdata";
    async function getData() {
        await axios.get(endPointData)
        .then(res => {
            setData(res.data.data);
            setRows(res.data.rows);
            setCols(res.data.cols);
        })
        .catch(err => {
            console.log(err);
        });
        
        
    }
    useEffect(() => {
        getData();
    }, []);

    //#############################################################################################################################
    var array = []
    data.map((row, i) => {
        const dict = new Object()  
        dict.id = i+1
    
        row.map((item, j) => {

            if (item === "0") {
                dict["col"+String(j+1)] = "OCUPADO"
            } else {
                dict["col"+String(j+1)] = "LIBRE"
            }
        })
        array.push(dict)
    })
    
    //#############################################################################################################################
    const columns = [];

    for (let i = 0; i < cols; i++) {
        const dict = {};
        dict.name = "col" + String(i+1);
        dict.selector = row => row["col" + String(i+1)];
        dict.center = true;
        dict.conditionalCellStyles = [
            {
                when: row => row["col" + String(i+1)] === "LIBRE",
                style: {
                    backgroundColor: "green",
                    color: "white",
                    "fontWeight": "bold",
                        "&:hover": {cursor: "pointer"}
                },
            },
            {
                when: row => row["col" + String(i+1)] === "OCUPADO",
                style: {
                    backgroundColor: "red",
                    color: "black",
                    "fontWeight": "bold",
                        "&:hover": {cursor: "pointer"}
                }
            }
        ];
        columns.push(dict);
    }

    //#############################################################################################################################
    // #Handlers
    const headers = {
        'Content-Type': 'application/json',
    }

    function between(min, max) {  
        return Math.floor(
          Math.random() * (max - min) + min
        )
    }

    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }

    const handleEntrada = (e) => {
        e.preventDefault();
        const historial = [];

        let sended = false;
        while (sended === false) {
            const randCol = between(0, cols);
            const randRow = between(0, rows);
            historial.push([randRow, randCol]);


            if (data[randRow][randCol] === "1") {
                
                axios.put("http://localhost:8080/entrada", {
                    "cols": randCol,
                    "rows": randRow}, {headers: headers})
                .then(res => {
                    console.log(res)
                })
                .catch(err => {
                    console.log(err)
                }
                )
                alert("Pase a la fila: fila" + String(randRow+1) + " y columna: " + String(randCol+1));
                sended = true;
                window.location.reload(false);
            }
            const unique = historial.filter(onlyUnique);
            if (unique.length > cols*rows) {
                alert("No hay mas espacios libres")
                sended = true;
            }
        }
    }

    
    const handleSalida = (e) => {
        e.preventDefault();
        const historial = [];

        let sended = false;
        while (sended === false) {
            const randCol = between(0, cols);
            const randRow = between(0, rows);
            historial.push([randRow, randCol]);
            if (data[randRow][randCol] === "0") {
                
                axios.put("http://localhost:8080/salida", {
                    "cols": randCol,
                    "rows": randRow}, {headers: headers})
                .then(res => {
                    console.log(res)
                })
                .catch(err => {
                    console.log(err)
                }
                )
                alert("Desocupando espacio: fila" + String(randRow+1) + " y columna: " + String(randCol+1));
                window.location.reload(false);
                sended = true;

            }

            const unique = historial.filter(onlyUnique);
     
            if (unique.length > cols*rows) {
                alert("No hay espacios ocupados")
                sended = true;
            }
        }
        
    }

    const sumData = data.reduce((a, b) => a.concat(b), []).reduce((a, b) => Number(a) + Number(b), 0);
    console.log(sumData);

    //#############################################################################################################################
    const handleNewArray = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8080/createparking", data2, {headers: headers})
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
        window.location.reload(false);
    }

    const handleChange = (e) => {
        e.preventDefault();
        const {name, type, value} = e.target;
        switch (type) {
            case "number":
                setData2({...data2, [name]: Number(value)});
                break;
            default:
                setData2({...data2, [name]: value});
        }
    }
    

    return (
        <Fragment>
            
            <Container fluid={true} className={"datatables"}>
                
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>  
                <h1>SISTEMA DE PARQUEO DE VEHICULOS</h1>
            </div>
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>  
                <h2>Espacios disponibles: {sumData}</h2>
            </div>

                <Row>
                    <Card>
                        <CardBody>
                            <DataTable
                                columns={columns}
                                data={array}
                            />
                        </CardBody>

                    <Button onClick={handleEntrada}>
                        INGRESAR AL ESTACIONAMIENTO
                    </Button>
                    <span>
                        <br/>
                    </span>

                    <Button onClick={handleSalida}>
                        SALIR DEL ESTACIONAMIENTO
                    </Button>
                    
                    </Card>
                </Row>

                <Row>
                    <Card>
                        <h2>GENERAR NUEVO ESTACIONAMIENTO</h2>
                        <Form onSubmit={handleNewArray}>
                            <FormGroup>
                                <Label>Ingrese el numero de fila</Label>
                                <Input type="number" name="rows" id="exampleEmail" placeholder="Filas" onChange={handleChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label>Ingrese el numero de columna</Label>
                                <Input type="number" name="cols" id="examplePassword" placeholder="Columnas" onChange={handleChange} />
                            </FormGroup>
                            <Button>
                                ENTRAR
                            </Button>
                        </Form>
                    </Card>
                </Row>
            </Container>
        </Fragment>
    );
}

export default TableIndex;