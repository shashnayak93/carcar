import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import dayjs from "dayjs";

function AppointmentsList() {
    const[appointments,setAppointments] = useState([]);
    const[automobiles,setAutomobiles] = useState([]);

    const fetchAppointmentData = async () => {

        const url = `http://localhost:8080/api/appointments/`;
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            console.log(data);
            setAppointments(data.appointments);
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
            console.log(vins);
            setAutomobiles(vins);
            }
          }

    useEffect(() => {
        fetchAutomobileData();
    }, []);

    const handleCancel = async (event) => {

        const value=event.target.value;
        const appointmentUrl = `http://localhost:8080/api/appointments/${value}/cancel/`;
        const fetchConfig = {
            method: "Put",
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const appointmentResponse = await fetch(appointmentUrl, fetchConfig);
        if (appointmentResponse.ok) {
            const cancelledAppointment = await appointmentResponse.json();
            console.log(cancelledAppointment);

            setAppointments(appointments.filter(appointment => String(appointment.id) !== value))

        }

    }

    const handleFinish = async (event) => {

        const value=event.target.value;
        const appointmentUrl = `http://localhost:8080/api/appointments/${value}/finish/`;
        const fetchConfig = {
            method: "Put",
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const appointmentResponse = await fetch(appointmentUrl, fetchConfig);
        if (appointmentResponse.ok) {
            const finishedAppointment = await appointmentResponse.json();
            console.log(finishedAppointment);

            setAppointments(appointments.filter(appointment => String(appointment.id) !== value))

        }

    }

    return(
        <div>
        <h1>Service Appointments</h1>
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
                </tr>
            </thead>
            <tbody>
                {appointments.map(appointment => {
                    if(appointment.status !== "finished" && appointment.status !== "cancelled") {
                        dayjs().add(1,'hour');
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
                                <td><button onClick={handleCancel} value={appointment.id} className="btn btn-danger">Cancel</button><button onClick={handleFinish} value={appointment.id} className="btn btn-success">Finish</button></td>
                            </tr>
                        );
                    }

                })}
            </tbody>
        </table>
        </div>

    )
}

export default AppointmentsList;
