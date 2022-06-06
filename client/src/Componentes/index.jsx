import React, { Fragment , useEffect, useState} from "react";
import {Container, Row, Col, Card, CardBody, Button} from 'reactstrap';
import DataTable from 'react-data-table-component';
import axios from 'axios';


const TableIndex = () => {
    const [data, setData] = useState([]);
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
    const handleEntrada = (e) => {
        e.preventDefault();
        let sended = false;
        for (let i = 0; i < data.length; i++) {
            const row = data[i];
            for (let j = 0; j < row.length; j++) {
                const item = row[j];
                if (item === "1") {
                    const ResponseObject = {
                        rows:i ,
                        cols:j
                    }
                    console.log(ResponseObject);
                    
                    axios.post("http://localhost:8080/entrada", ResponseObject, {headers: headers})
                    .then(res => {
                        console.log(res);
                    })
                    .catch(err => {
                        console.log(err);
                    });
                    sended = true;
                    alert("Pase a la fila: " + String(i+1) + " y columna: " + String(j+1));
                    window.location.reload(false);
                    break;
                }
            }

            if (sended) {
                break;
            }
        }
        if (!sended) {
            alert("No hay espacios disponibles");
        }
    }

    const handleSalida = (e) => {
        e.preventDefault();
        let sended = false;
        for (let i = 0; i < data.length; i++) {
            const row = data[i];
            for (let j = 0; j < row.length; j++) {
                const item = row[j];
                if (item === "0") {
                    const ResponseObject = {
                        rows:i ,
                        cols:j
                    }
                    console.log(ResponseObject);
                    
                    axios.put("http://localhost:8080/salida", ResponseObject, {headers: headers})
                    .then(res => {
                        console.log(res);
                    })
                    .catch(err => {
                        console.log(err);
                    });
                    sended = true;
                    
                    alert("Desocupando espacio: " + String(i+1) + " y columna: " + String(j+1));
                    window.location.reload(false);
                    break;
                }
            }

            if (sended) {
                break;
            }
        }
        if (!sended) {
            alert("No hay espacios ocupados");
        }
    }

    return (
        <Fragment>
            
            <Container fluid={true} className={"datatables"}>
                
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>  
                <h1>SISTEMA DE PARQUEO DE VEHICULOS</h1>
            </div>
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>  
                <h2>Espacios Totales: {rows * cols - data.length}</h2>
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
            </Container>
        </Fragment>
    );
}

export default TableIndex;