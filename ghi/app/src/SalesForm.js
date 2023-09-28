import React, { useEffect, useState } from 'react';

function SalesForm( ) {
    const [automobiles, setAutomobiles] = useState([]);
    const [automobile,setAutomobile] =  useState('');
    const [salespeoples, setSalesPeoples] = useState([]);
    const [salespeople,setSalesPeople] =  useState('');
    const [customers, setCustomers] = useState([]);
    const [customer,setCustomer] =  useState('');
    const [price, setPrice] = useState('');
    const [sales, setSales] = useState([]);

    const handleAutomobileChange = (e) => {
        const value = e.target.value;
        setAutomobile(value);
    }

    const handleSalesPeopleChange = (e) => {
        const value = e.target.value;
        setSalesPeople(value);
    }

    const handleCustomerChange = (e) => {
        const value = e.target.value;
        setCustomer(value);
    }

    const handlePriceChange = (e) => {
        const value = e.target.value;
        setPrice(value);
    }

    const fetchSalesData = async () => {
      const url = "http://localhost:8090/api/sales/";
      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        const vins = [];
        {data.sales.map(sale => {
          vins.push(sale.automobile.vin)
      })}
        setSales(vins);
    }
    }

    useEffect(() => {
      fetchSalesData();
  }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {};
        data.automobile = automobile;
        data.salespeople = salespeople;
        data.customer = customer;
        data.price = price;

        const salesUrl = 'http://localhost:8090/api/sales/';
        const fetchConfig = {
          method: "post",
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        };

        const response = await fetch(salesUrl, fetchConfig);
        if (response.ok) {
          const newSale = await response.json();
          console.log(newSale);

            setAutomobile('');
            setSalesPeople('');
            setCustomer('');
            setPrice('');
            fetchSalesData();

        }
      }


    const fetchAutomobileData = async () => {
        const url = 'http://localhost:8100/api/automobiles/';
        const response = await fetch(url);

        if (response.ok) {
          const data = await response.json();
            // console.log(data);
            setAutomobiles(data.autos);
            }
      }

        useEffect(() => {
        fetchAutomobileData();
      }, []);

      const fetchSalesPeopleData = async () => {
        const url = 'http://localhost:8090/api/salespeople/';
        const response = await fetch(url);

        if (response.ok) {
          const data = await response.json();
            // console.log(data);
            setSalesPeoples(data.salespeople);
            }
      }

        useEffect(() => {
          fetchSalesPeopleData();
      }, []);

      const fetchCustomerData = async () => {
        const url = 'http://localhost:8090/api/customers/';
        const response = await fetch(url);

        if (response.ok) {
          const data = await response.json();
            console.log(data);
            setCustomers(data.customer);
            }
      }

        useEffect(() => {
          fetchCustomerData();
      }, []);


    return(
    <>
    <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a new sale</h1>
            <form onSubmit={handleSubmit} id="create-conference-form">
              <div className="mb-3">
                <select onChange={handleAutomobileChange} value={automobile} id="automobile" name="automobile" className="form-select">
                <option value="">Choose an automobile VIN</option>
                    {automobiles.map(automobile => {
                        if (!(sales.includes(automobile.vin))){
                        return (
                        <option key={automobile.id} value={automobile.id}>
                        {automobile.vin}
                        </option>
                        );}
                    })}
                </select>
              </div>
               <div className="mb-3">
                <select onChange={handleSalesPeopleChange} value={salespeople} id="salespeople" name="salespeople" className="form-select">
                <option value="">Choose a Sales Person</option>
                    {salespeoples.map(salespeople => {
                        return (
                        <option key={salespeople.id} value={salespeople.id}>
                        {salespeople.first_name} {salespeople.last_name}
                </option>
                        );
                    })}
                </select>
              </div>
              <div className="mb-3">
                <select onChange={handleCustomerChange} value={customer} id="customer" name="customer" className="form-select">
                <option value="">Choose a Customer</option>
                    {customers.map(customer => {
                        return (
                        <option key={customer.id} value={customer.id}>
                        {customer.first_name} {customer.last_name}
                </option>
                        );
                    })}
                </select>
              </div>
               <div className="form-floating mb-3">
                <input onChange={handlePriceChange} value={price} placeholder="Price" type="number" name="price" id="price" className="form-control"/>
                <label htmlFor="price">Price</label>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
      </>
  );

  }

export default SalesForm;
