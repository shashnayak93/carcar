import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ManufacturersList from './ManufacturersList';
import ManufacturersForm from './ManufacturersForm';
import ModelsList from './ModelsList';
import ModelsForm from './ModelsForm';
import AutomobilesList from './AutomobilesList';
import AutomobilesForm from './AutomobilesForm';
import SalespeopleList from './SalespeopleList';
import SalespeopleForm from './SalespeopleForm';
import CustomerList from './CustomerList';
import CustomerForm from './CustomerForm';
import SalesList from './SalesList';
import SalesForm from './SalesForm';
import SalesHistory from './SalesHistory';
import TechniciansList from './TechniciansList';
import TechniciansForm from './TechniciansForm';
import AppointmentsList from './AppointmentsList';
import AppointmentsHistory from './AppointmentsHistory';
import AppointmentsForm from './AppointmentsForm';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="manufacturers">
            <Route index element={<ManufacturersList />} />
            <Route path="create" element={<ManufacturersForm />} />
          </Route>
          <Route path="models">
            <Route index element={<ModelsList />} />
            <Route path="create" element={<ModelsForm />} />
          </Route>
          <Route path="automobiles">
            <Route index element={<AutomobilesList />} />
            <Route path="create" element={<AutomobilesForm />} />
          </Route>
          <Route path="salespeople">
            <Route index element={<SalespeopleList />} />
            <Route path = "create" element={<SalespeopleForm />} />
          </Route>
          <Route path="customers">
            <Route index element={<CustomerList />} />
            <Route path = "create" element={<CustomerForm />} />
          </Route>
          <Route path="sales">
            <Route index element={<SalesList />} />
              <Route path = "create" element={<SalesForm />} />
            <Route path = "history" element={<SalesHistory />} />
          </Route>
          <Route path="technicians">
            <Route index element={<TechniciansList />} />
            <Route path="create" element={<TechniciansForm />} />
          </Route>
          <Route path="appointments">
            <Route index element={<AppointmentsList />} />
            <Route path="create" element={<AppointmentsForm />} />
            <Route path = "history" element={<AppointmentsHistory />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
