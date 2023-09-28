import React, { useEffect, useState } from 'react';

function SalesHistory() {
  const [sales, setSales] = useState([]);
  const [salespeople, setSalespeople] = useState([]);
  const [selectedSalesperson, setSelectedSalesperson] = useState('');

  const fetchSalesData = async () => {
    const response = await fetch('http://localhost:8090/api/sales/');
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      setSales(data.sales);
    } else {
      console.error('Invalid response');
    }
  };

  const fetchSalespeopleData = async () => {
    const response = await fetch('http://localhost:8090/api/salespeople/');
    if (response.ok) {
      const data = await response.json();
      setSalespeople(data.salespeople);
    } else {
      console.error('Invalid response');
    }
  };

  useEffect(() => {
    fetchSalesData();
    fetchSalespeopleData();
  }, []);

  const handleSalespersonChange = (e) => {
    setSelectedSalesperson(e.target.value);
  };

  console.log(selectedSalesperson);

  return (
    <>
      <h1>Salespeople History</h1>
      <div className="search-bar">
        <select onChange={handleSalespersonChange} value={selectedSalesperson}>
          <option>All Salespeople</option>
          {salespeople.map((salesperson) => (
            <option key={salesperson.id} value={salesperson.id}>
              {salesperson.first_name} {salesperson.last_name}
            </option>
          ))}
        </select>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Salesperson</th>
            <th>Customer</th>
            <th>VIN</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {sales.filter((sale) => String(sale.salespeople.id) === selectedSalesperson).map((sale) =>
          {
            return(
            <tr key={sale.id}>
              <td>{sale.salespeople.first_name} {sale.salespeople.last_name}</td>
              <td>{sale.customer.first_name} {sale.customer.last_name}</td>
              <td>{sale.automobile.vin}</td>
              <td>{sale.price}</td>
            </tr>
            )})}
        </tbody>
      </table>
    </>
  );
}

export default SalesHistory;
