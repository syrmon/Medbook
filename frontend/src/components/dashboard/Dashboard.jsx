import {
  Add,
  BarChart,
  Event,
  People,
  Person,
  Receipt,
} from "@mui/icons-material";
import styles from "./styles.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddAppointmentPanel from "components/addAppointmentPanel/AddAppointmentPanel";
import AddCustomerPanel from "components/addCustomerPanel/AddCustomerPanel";
import AddReceipePanel from "components/addReceipePanel/AddReceipePanel";

const Dashboard = () => {
  const [addNewData, setAddNewData] = useState(false);
  const [eventActive, setEventActive] = useState(false);
  const [customerActive, setCustomerActive] = useState(false);
  const [receipeActive, setReceipeActive] = useState(false);
  const navigate = useNavigate();

  const updateEventActive = (status) => {
    setEventActive(status);
    if (status === false) {
      window.location.reload(false);
    }
  };

  const updateCustomerActive = (status) => {
    setCustomerActive(status);
  };

  const updateReceipeActive = (status) => {
    setReceipeActive(status);
  };

  return (
    <div className={`${styles.container}`}>
      {eventActive && <AddAppointmentPanel status={updateEventActive} />}
      {customerActive && <AddCustomerPanel status={updateCustomerActive} />}
      {receipeActive && <AddReceipePanel status={updateReceipeActive} />}
      <div
        className={`${styles.serviceContainer} ${
          window.location.pathname === "/receipes" && styles.active
        }`}
        onClick={() => {
          navigate("/receipes");
        }}
      >
        <Receipt sx={{ fontSize: 30 }} style={{ color: "#fff" }} />
      </div>
      <div
        className={`${styles.serviceContainer} ${
          window.location.pathname === "/appointments" && styles.active
        }`}
        onClick={() => {
          navigate("/appointments");
        }}
      >
        <Event sx={{ fontSize: 30 }} style={{ color: "#fff" }} />
      </div>
      <div className={`${styles.serviceContainer}`}>
        <div
          className={`${styles.addContainer}`}
          onClick={() => {
            setAddNewData(!addNewData);
          }}
        >
          <Add sx={{ fontSize: 70 }} style={{ color: "#0194e9" }} />
        </div>
        {addNewData === true && (
          <div
            className={`${styles.addButtonGroup}  ${
              addNewData === true ? styles.fadeInUp : styles.fadeOutDown
            }`}
          >
            <div
              className={`${styles.addButtons}`}
              onClick={() => {
                setCustomerActive(true);
                setAddNewData(!addNewData);
              }}
            >
              <Person
                sx={{ fontSize: 20 }}
                style={{ color: "#fff", marginRight: "15px" }}
              />
              <h4>Müştəri</h4>
            </div>
            <div
              className={`${styles.addButtons} `}
              onClick={() => {
                updateEventActive(true);
                setAddNewData(false);
              }}
            >
              <Event
                sx={{ fontSize: 20 }}
                style={{ color: "#fff", marginRight: "15px" }}
              />
              <h4>Randevu</h4>
            </div>
            <div
              className={`${styles.addButtons}`}
              onClick={() => {
                setReceipeActive(true);
                setAddNewData(false);
              }}
            >
              <Receipt
                sx={{ fontSize: 20 }}
                style={{ color: "#fff", marginRight: "15px" }}
              />
              <h4>Qəbz</h4>
            </div>
          </div>
        )}
      </div>
      <div
        className={`${styles.serviceContainer} ${
          window.location.pathname === "/statistics" && styles.active
        }`}
        onClick={() => {
          navigate("/statistics");
        }}
      >
        <BarChart sx={{ fontSize: 30 }} style={{ color: "#fff" }} />
      </div>
      <div
        className={`${styles.serviceContainer} ${
          window.location.pathname === "/customers" && styles.active
        }`}
        onClick={() => {
          navigate("/customers");
        }}
      >
        <People sx={{ fontSize: 30 }} style={{ color: "#fff" }} />
      </div>
    </div>
  );
};

export default Dashboard;
