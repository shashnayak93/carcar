import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


function SalesList() {
    const[sales,setSales] = useState([]);

    const fetchData = async () => {

        const url = `http://localhost:8090/api/sales/`;
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            console.log(data)
            setSales(data.sales);
            }
          }

    useEffect(() => {
        fetchData();
    }, []);




    return(
        <div>
        <h1>Sales</h1>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Salesperson Employee ID</th>
                    <th>Salesperson Name</th>
                    <th>Customer</th>
                    <th>VIN</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                {sales.map(sales => {
                    return (
                        <tr key={sales.href} value={sales.href}>
                            <td>{sales.salespeople.employee_id}</td>
                            <td>{sales.salespeople.first_name} {sales.salespeople.last_name}</td>
                            <td>{sales.customer.first_name} {sales.customer.last_name}</td>
                            <td>{sales.automobile.vin}</td>
                            <td>{sales.price}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
        </div>

    )
}

export default SalesList;
