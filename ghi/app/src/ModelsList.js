import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function ModelsList() {
    const[models,setModels] = useState([]);

    const fetchData = async () => {

        const url = `http://localhost:8100/api/models/`;
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setModels(data.models);
            }
          }

    useEffect(() => {
        fetchData();
    }, []);




    return(
        <div>
        <h1>Models</h1>
        <table className="table table-striped table align-middle">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Manufacturer</th>
                    <th>Picture</th>
                </tr>
            </thead>
            <tbody>
                {models.map(model => {
                    return (
                        <tr key={model.href} value={model.href}>
                            <td className="align-middle">{model.name }</td>
                            <td className="align-middle">{model.manufacturer.name}</td>
                            <td className="align-middle"><img src={model.picture_url} className= "img-thumbnail" width="300em"/></td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
        </div>

    )
}

export default ModelsList;