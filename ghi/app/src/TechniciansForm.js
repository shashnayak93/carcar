import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function TechniciansForm() {
    const [firstName, setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [employeeId,setEmployeeId] = useState("");


    const handleFirstNameChange = (e) => {
        const value = e.target.value;
        setFirstName(value)
        }

    const handleLastNameChange = (e) => {
        const value = e.target.value;
        setLastName(value)
    }

    const handleEmployeeIdChange = (e) => {
        const value = e.target.value;
        setEmployeeId(value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {};

        data.first_name = firstName;
        data.last_name = lastName;
        data.employee_id = employeeId;


        const technicianUrl = 'http://localhost:8080/api/technicians/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const technicianResponse = await fetch(technicianUrl, fetchConfig);
        if (technicianResponse.ok) {
            const newTechnician = await technicianResponse.json();
            console.log(newTechnician);

            setFirstName('');
            setLastName('');
            setEmployeeId('');

        }
      }

    return(
        <>
        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Add a Technician</h1>
            <form onSubmit={handleSubmit} id="create-conference-form">
              <div className="form-floating mb-3">
                <input onChange = {handleFirstNameChange} value={firstName} placeholder="First Name" required type="text" id="first_name" name="first_name" className="form-control" />
                <label htmlFor="first_name">First Name...</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange = {handleLastNameChange} value={lastName} placeholder="Last Name" required type="text" id="last_name" name="last_name" className="form-control" />
                <label htmlFor="last_name">Last Name...</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange = {handleEmployeeIdChange} value={employeeId} placeholder="Employee ID" required type="text" id="employee_id" name="employee_id" className="form-control" />
                <label htmlFor="employee_id">Employee ID...</label>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
      </>
    )
}

export default TechniciansForm;