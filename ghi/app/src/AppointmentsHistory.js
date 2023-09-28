import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

function AppointmentsHistory() {
    const[appointments,setAppointments] = useState([]);
    const[automobiles,setAutomobiles] = useState([]);
    const[filter,setFilter] = useState('');

    const fetchAppointmentData = async () => {

        const url = `http://localhost:8080/api/appointments/`;
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setAppointments(data.appointments);
            } else{
                console.log("Response Invalid");
            }
          }

    useEffect(() => {
        fetchAppointmentData();
    }, []);

    const fetchAutomobileData = async () => {

        const url = `http://localhost:8100/api/automobiles/`;
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            const vins=[]
            {data.autos.map(auto => {
                vins.push(auto.vin);
            })}
            setAutomobiles(vins);
            }
          }

    useEffect(() => {
        fetchAutomobileData();
    }, []);

    const handleFilterChange = (e) => {
        const value = e.target.value;
        setFilter(value);
    }


    return(
        <>
        <div>
        <h1>Service Appointments</h1>
        <input onChange={handleFilterChange} placeholder="Search by Vin" required type="text" id="filter" name="filter" value = {filter} className="form-control" />
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Vin</th>
                    <th>is VIP?</th>
                    <th>Customer</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Technician</th>
                    <th>Reason</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {appointments.filter(appoint => appoint.vin.toLowerCase().includes(filter.toLowerCase())).map(appointment => {
                        let date = dayjs(appointment.date_time).format("MM/DD/YYYY");
                        let time = dayjs(appointment.date_time).add(5,'hour').format("hh:mm A");
                    return (
                        <tr key={appointment.href} value={appointment.href}>
                            <td>{appointment.vin}</td>
                            {automobiles.includes(appointment.vin)
                                ? <td>Yes</td>
                                : <td>No</td>
                            }
                            <td>{appointment.customer}</td>
                            <td>{date}</td>
                            <td>{time}</td>
                            <td>{appointment.technician?.first_name} {appointment.technician?.last_name}</td>
                            <td>{appointment.reason}</td>
                            <td>{appointment.status}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
        </div>
        </>
    )
}

export default AppointmentsHistory;