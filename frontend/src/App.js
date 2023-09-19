import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { UseSelector } from "react-redux";
import Appointments from "pages/appointments/Appointments";
import Statistics from "pages/statistics/Statistics";
import Customers from "pages/customers/Customers";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/customers" replace />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/statistics" element={<Statistics />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
