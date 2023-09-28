import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function AutomobilesList() {
    const[automobiles,setAutomobiles] = useState([]);
    const[sales, setSales] = useState([]);

    const fetchData = async () => {

        const url = `http://localhost:8100/api/automobiles/`;
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setAutomobiles(data.autos);
            }
          }

    useEffect(() => {
        fetchData();
    }, []);


    const fetchSaleData = async () => {
        const url = "http://localhost:8090/api/sales/"
        const response = await fetch(url);

        if (response.ok){
            const data = await response.json();
            const vins = [];
            console.log(data);
            {data.sales.map(sale => {
                vins.push(sale.automobile.vin)
            })}
            setSales(vins);
        }
    }

    useEffect(() => {
        fetchSaleData();
    }, []);

    console.log(sales)
    return(
        <div>
        <h1>Automobiles</h1>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Vin</th>
                    <th>Color</th>
                    <th>Year</th>
                    <th>Model</th>
                    <th>Manufacturer</th>
                    <th>Sold</th>
                </tr>
            </thead>
            <tbody>
                {automobiles.map(automobile => {
                    return (
                        <tr key={automobile.href} value={automobile.href}>
                            <td>{automobile.vin}</td>
                            <td>{automobile.color}</td>
                            <td>{automobile.year}</td>
                            <td>{automobile.model.name}</td>
                            <td>{automobile.model.manufacturer.name}</td>
                            {sales.includes(automobile.vin)
                                    ? <td>Yes</td>
                                    : <td>No</td>
                            }
                        </tr>
                    );
                })}
            </tbody>
        </table>
        </div>

    )
}

export default AutomobilesList;
