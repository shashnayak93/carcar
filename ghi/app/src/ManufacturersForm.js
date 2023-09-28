import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function ManufacturersForm() {
    const [name, setName] = useState("");

    const handleName = (e) => {
        const value = e.target.value;
        setName(value)
        }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {};

        data.name = name;


        const manufacturerUrl = 'http://localhost:8100/api/manufacturers/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(manufacturerUrl, fetchConfig);
        if (response.ok) {
            const newManufacturer = await response.json();
            console.log(newManufacturer);

            setName('');

        }
      }

    return(
        <>
        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a manufacturer</h1>
            <form onSubmit={handleSubmit} id="create-conference-form">
              <div className="form-floating mb-3">
                <input onChange = {handleName} value={name} placeholder="Name" required type="text" id="name" name="name" className="form-control" />
                <label htmlFor="name">Manufacturer name...</label>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
      </>
    )
}

export default ManufacturersForm;