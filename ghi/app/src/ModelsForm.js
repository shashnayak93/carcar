import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function ModelsForm() {
    const [manufacturers,setManufacturers] = useState([]);
    const [name, setName] = useState("");
    const [pictureUrl,setPictureUrl] = useState("");
    const [manufacturer,setManufacturer] = useState("");


    const fetchData = async () =>{

        const url = `http://localhost:8100/api/manufacturers/`;
        const fetchConfig = {
            method: "get",
            headers: {
                "Content-Type": "application/json",
            },
        };
        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            const data = await response.json();
            setManufacturers(data.manufacturers)
            }
        }

        useEffect(() => {
            fetchData();
        }, []);

    const handleNameChange = (e) => {
        const value = e.target.value;
        setName(value)
        }

    const handlePictureUrlChange = (e) => {
        const value = e.target.value;
        setPictureUrl(value)
    }

    const handleManufacturerChange = (e) => {
        const value = e.target.value;
        setManufacturer(value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {};

        data.name = name;
        data.picture_url = pictureUrl;
        data.manufacturer_id = manufacturer;


        const modelUrl = 'http://localhost:8100/api/models/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const modelResponse = await fetch(modelUrl, fetchConfig);
        if (modelResponse.ok) {
            const newModel = await modelResponse.json();
            console.log(newModel);

            setName('');
            setPictureUrl('');
            setManufacturer('');

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
                <input onChange = {handleNameChange} value={name} placeholder="Name" required type="text" id="name" name="name" className="form-control" />
                <label htmlFor="name">Model name...</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange = {handlePictureUrlChange} value={pictureUrl} placeholder="Picture Url" required type="text" id="picture_url" name="picture_url" className="form-control" />
                <label htmlFor="picture_url">Picture URL...</label>
              </div>
              <div className="mb-3">
                <select onChange = {handleManufacturerChange} required id="manufacturer_id" name="manufacturer_id" value = {manufacturer} className="form-select">
                  <option value="">Choose a manufactuer...</option>
                    {manufacturers.map(manufacturer => {
                        return (
                            <option key = {manufacturer.id} value={manufacturer.id}>
                                {manufacturer.name}
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

export default ModelsForm;