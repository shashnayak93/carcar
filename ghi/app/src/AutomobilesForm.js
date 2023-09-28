import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function AutomobilesForm() {
    const [models,setModels] = useState([]);
    const [color, setColor] = useState("");
    const [year,setYear] = useState("");
    const [vin,setVin] = useState("");
    const [model,setModel] = useState("");


    const fetchData = async () =>{

        const url = `http://localhost:8100/api/models/`;
        const fetchConfig = {
            method: "get",
            headers: {
                "Content-Type": "application/json",
            },
        };
        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            const data = await response.json();
            setModels(data.models)
            }
        }

        useEffect(() => {
            fetchData();
        }, []);

    const handleColorChange = (e) => {
        const value = e.target.value;
        setColor(value)
        }

    const handleYearChange = (e) => {
        const value = e.target.value;
        setYear(value)
    }

    const handleVinChange = (e) => {
        const value = e.target.value;
        setVin(value)
    }

    const handleModelChange = (e) => {
        const value = e.target.value;
        setModel(value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {};

        data.color = color;
        data.year = year;
        data.vin = vin;
        data.model_id = model;


        const automobileUrl = 'http://localhost:8100/api/automobiles/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const automobileResponse = await fetch(automobileUrl, fetchConfig);
        console.log(automobileResponse);
        if (automobileResponse.ok) {
            const newAutomobile = await automobileResponse.json();
            console.log(newAutomobile);

            setColor('');
            setYear('');
            setVin('');
            setModel('');

        }
      }

    return(
        <>
        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a vehicle model</h1>
            <form onSubmit={handleSubmit} id="create-conference-form">
              <div className="form-floating mb-3">
                <input onChange = {handleColorChange} value={color} placeholder="Color" required type="text" id="color" name="color" className="form-control" />
                <label htmlFor="color">Color...</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange = {handleYearChange} value={year} placeholder="Year" required type="text" id="year" name="year" className="form-control" />
                <label htmlFor="year">Year...</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange = {handleVinChange} value={vin} placeholder="Vin" required type="text" id="vin" name="vin" className="form-control" />
                <label htmlFor="vin">VIN...</label>
              </div>
              <div className="mb-3">
                <select onChange = {handleModelChange} required id="model_id" name="model_id" value = {model} className="form-select">
                  <option value="">Choose a model...</option>
                    {models.map(model => {
                        return (
                            <option key = {model.id} value={model.id}>
                                {model.name}
                            </option>
                        );
                    })}
                </select>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
      </>
    )
}

export default AutomobilesForm;
