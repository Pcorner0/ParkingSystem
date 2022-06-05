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

    console.log(data);
    
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
    
    console.log(array, "array", cols, "cols", rows, "rows");

    //#############################################################################################################################
    const columns = [];

    for (let i = 0; i < cols; i++) {
        console.log(i)

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
                    color: "white",
                    "fontWeight": "bold",
                        "&:hover": {cursor: "pointer"}
                }
            }
        ];
        columns.push(dict);
    }
    console.log(columns, "columns");

    //#############################################################################################################################
    // #Handlers
    const handleButton = (e) => {
        console.log("Se imprime");
        alert("Se ha registrado una entrada");

    }

    return (
        <Fragment>
            <Container fluid={true} className={"datatables"}>
                <Row>

                    <Card>
                        <h1>SISTEMA DE PARQUEO DE VEHICULOS</h1>

                        <CardBody>
                            <DataTable
                                title="Lista de Vehiculos"
                                columns={columns}
                                data={array}
                                
                            />
                        </CardBody>
                    <Button onClick={handleButton}>
                        INGRESAR AL ESTACIONAMIENTO
                    </Button>
                    
                    </Card>
                </Row>
            </Container>
        </Fragment>
    );
}

export default TableIndex;