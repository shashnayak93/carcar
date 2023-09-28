import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


function CustomerList() {
    const[customer ,setCustomer] = useState([]);

    const fetchData = async () => {

        const url = `http://localhost:8090/api/customers/`;
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setCustomer(data.customer);
            }
          }

    useEffect(() => {
        fetchData();
    }, []);




    return(
        <div>
        <h1>Customer</h1>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Phone Number</th>
                    <th>Address</th>
                </tr>
            </thead>
            <tbody>
                {customer.map(customer => {
                    return (
                        <tr key={customer.href} value={customer.href}>
                            <td>{customer.first_name}</td>
                            <td>{customer.last_name}</td>
                            <td>{customer.phone_number}</td>
                            <td>{customer.address}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
        </div>

    )
}

export default CustomerList;
