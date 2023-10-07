import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { UseSelector } from "react-redux";
import Appointments from "pages/appointments/Appointments";
import Statistics from "pages/statistics/Statistics";
import Customers from "pages/customers/Customers";
import Dashboard from "components/dashboard/Dashboard";
import Banner from "components/banner/Banner";
import styles from "./styles.module.css";
function App() {
  return (
    <div>
      <BrowserRouter>
        <div className={styles.container}>
          <div className={styles.dashboardContainer}>
            <Dashboard />
          </div>
          <div className={styles.bannerContainer}>
            <Banner />
          </div>
          <div className={styles.mainContainer}>
            <Routes>
              <Route path="/" element={<Navigate to="/customers" replace />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/appointments" element={<Appointments />} />
              <Route path="/statistics" element={<Statistics />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
