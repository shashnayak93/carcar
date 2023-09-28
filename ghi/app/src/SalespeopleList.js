import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


function SalespeopleList() {
    const[salespeople,setSalespeople] = useState([]);

    const fetchData = async () => {

        const url = `http://localhost:8090/api/salespeople/`;
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            console.log(data)
            setSalespeople(data.salespeople);
            }
          }

    useEffect(() => {
        fetchData();
    }, []);




    return(
        <div>
        <h1>Salespeople</h1>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Employee Id</th>
                </tr>
            </thead>
            <tbody>
                {salespeople.map(salespeople => {
                    return (
                        <tr key={salespeople.href} value={salespeople.href}>
                            <td>{salespeople.first_name}</td>
                            <td>{salespeople.last_name}</td>
                            <td>{salespeople.employee_id}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
        </div>

    )
}

export default SalespeopleList;
