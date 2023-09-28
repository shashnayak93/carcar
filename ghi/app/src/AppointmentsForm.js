import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function AppointmentsForm() {
    const [technicians,setTechnicians] = useState([]);
    const [vin, setVin] = useState("");
    const [customer,setCustomer] = useState("");
    const [dateTime,setDateTime] = useState("");
    const [time,setTime] = useState("");
    const [technician,setTechnician] = useState("");
    const [reason,setReason] = useState("");


    const fetchData = async () =>{

        const url = `http://localhost:8080/api/technicians/`;
        const fetchConfig = {
            method: "get",
            headers: {
                "Content-Type": "application/json",
            },
        };
        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            setTechnicians(data.technicians)
            }
        }

    useEffect(() => {
        fetchData();
    }, []);

    const handleVinChange = (e) => {
        const value = e.target.value;
        setVin(value)
        }

    const handleCustomerChange = (e) => {
        const value = e.target.value;
        setCustomer(value)
    }

    const handleDateTimeChange = (e) => {
        const value = e.target.value;
        setDateTime(value)
    }

    const handleTechnicianChange = (e) => {
        const value = e.target.value;
        setTechnician(value)
    }

    const handleReasonChange = (e) => {
        const value = e.target.value;
        setReason(value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {};

        data.vin = vin;
        data.customer = customer;
        data.date_time = dateTime;
        data.technician = technician;
        data.reason = reason;

        console.log(data);


        const appointmentsUrl = 'http://localhost:8080/api/appointments/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const appointmentResponse = await fetch(appointmentsUrl, fetchConfig);
        if (appointmentResponse.ok) {
            const newAppointment = await appointmentResponse.json();
            console.log(newAppointment);

            setVin('');
            setCustomer('');
            setDateTime('');
            setTechnician('');
            setReason('');

        }
      }

    return(
        <>
        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a service appointment</h1>
            <form onSubmit={handleSubmit} id="create-conference-form">
              <div className="form-floating mb-3">
                <input onChange = {handleVinChange} value={vin} placeholder="Vin" required type="text" id="vin" name="vin" className="form-control" />
                <label htmlFor="vin">Automobile Vin...</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange = {handleCustomerChange} value={customer} placeholder="Customer" required type="text" id="customer" name="customer" className="form-control" />
                <label htmlFor="customer">Customer...</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleDateTimeChange} placeholder="Date Time" required type="datetime-local" id="date_time" name="date_time" value={dateTime} className="form-control" />
                <label htmlFor="date_time">Date & Time</label>
              </div>
              <div className="mb-3">
                <select onChange = {handleTechnicianChange} required id="technician" name="technician" value = {technician} className="form-select">
                  <option value="">Choose a technician...</option>
                    {technicians.map(technician => {
                        return (
                            <option key = {technician.id} value={technician.id}>
                                {technician.first_name} {technician.last_name}
                            </option>
                        );
                    })}
                </select>
              </div>
              <div className="form-floating mb-3">
                <input onChange = {handleReasonChange} value={reason} placeholder="Reason" required type="text" id="reason" name="reason" className="form-control" />
                <label htmlFor="reason">Reason...</label>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
      </>
    )
}

export default AppointmentsForm;