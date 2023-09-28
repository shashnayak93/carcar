import React, { useState } from 'react';

function CustomerForm() {
    const [firstName, setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [address,setAddress] = useState("");
    const [phoneNumber,setPhoneNumber] = useState("");


    const handleFirstNameChange = (e) => {
        const value = e.target.value;
        setFirstName(value)
        }

    const handleLastNameChange = (e) => {
        const value = e.target.value;
        setLastName(value)
    }

    const handleAddressChange = (e) => {
        const value = e.target.value;
        setAddress(value)
    }

    const handlePhoneNumberChange = (e) => {
      const value = e.target.value;
      setPhoneNumber(value)
  }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {};

        data.first_name = firstName;
        data.last_name = lastName;
        data.address = address;
        data.phone_number = phoneNumber;


        const customerUrl = 'http://localhost:8090/api/customers/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const customerResponse = await fetch(customerUrl, fetchConfig);
        if (customerResponse.ok) {
            const newCustomer = await customerResponse.json();
            console.log(newCustomer);

            setFirstName('');
            setLastName('');
            setAddress('');
            setPhoneNumber('');

        }
      }

      return(
        <>
        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Add a Salesperson</h1>
            <form onSubmit={handleSubmit} id="create-conference-form">
              <div className="form-floating mb-3">
                <input onChange = {handleFirstNameChange} value={firstName} placeholder="First Name" required type="text" id="first_name" name="first_name" className="form-control" />
                <label htmlFor="first_name">First Name</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange = {handleLastNameChange} value={lastName} placeholder="Last Name" required type="text" id="last_name" name="last_name" className="form-control" />
                <label htmlFor="last_name">Last Name</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange = {handleAddressChange} value={address} placeholder="Address" required type="text" id="address" name="address" className="form-control" />
                <label htmlFor="address">Address</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange = {handlePhoneNumberChange} value={phoneNumber} placeholder="Phone Number" required type="text" id="phone_number" name="phone_number" className="form-control" />
                <label htmlFor="phone_number">Phone Number</label>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
      </>
    )
}

export default CustomerForm;
