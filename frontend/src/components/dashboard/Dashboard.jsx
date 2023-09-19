import {
  Add,
  BarChart,
  Event,
  People,
  Person,
  Receipt,
  Search,
} from "@mui/icons-material";
import styles from "./styles.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddAppointmentPanel from "components/addAppointmentPanel/AddAppointmentPanel";
import AddCustomerPanel from "components/addCustomerPanel/AddCustomerPanel";

/*
    <div className={`${styles.container}`}>
      <div className={`${styles.profileContainer}`}>
        <div className={`${styles.profilePhoto}`}></div>

        <div className={`${styles.drInfo}`}>
          <h4 className={`${styles.drName}`}>Fikret Rehimov</h4>
          <h4 className={`${styles.officeName}`}>Dental Clinic az</h4>
        </div>
      </div>
      <div className={`${styles.linksContainer}`}>
        <div className={`${styles.appointmentsContainer}`}>
          <Event
            sx={{ fontSize: 30 }}
            style={{ paddingRight: "35px", color: "white" }}
          />
          <h3>Randevular</h3>
        </div>
      </div>
      <div className={`${styles.insertContainer}`}>
        <button className={`${styles.insertAppointment}`}>
          <AddTask sx={{ fontSize: 30 }} style={{ paddingRight: "15px" }} />
          Randevu əlavə et
        </button>
      </div>
      <div className={`${styles.firmContainer}`}>
        <h5>Medbook</h5>
      </div>
    </div>*/

const Dashboard = () => {
  const [addNewData, setAddNewData] = useState(false);
  const [eventActive, setEventActive] = useState(false);
  const [customerActive, setCustomerActive] = useState(false);
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

  return (
    <div className={`${styles.container}`}>
      <div
        className={`${styles.serviceContainer} ${
          window.location.pathname === "/receipt" && styles.active
        }`}
        onClick={() => {}}
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
            className={`${styles.addButtons}  ${
              addNewData === true ? styles.fadeInUp : styles.fadeOutDown
            }`}
          >
            <div
              className={`${styles.addCustomer}`}
              onClick={() => setCustomerActive(true)}
            >
              <Person
                sx={{ fontSize: 20 }}
                style={{ color: "#0194e9", marginRight: "15px" }}
              />
              <h4>Müştəri</h4>
            </div>
            <div
              className={`${styles.addAppointment} `}
              onClick={() => {
                updateEventActive(true);
                setAddNewData(false);
              }}
            >
              <Event
                sx={{ fontSize: 20 }}
                style={{ color: "#0194e9", marginRight: "15px" }}
              />
              <h4>Randevu</h4>
            </div>
            <div className={`${styles.addReceipe}`}>
              <Receipt
                sx={{ fontSize: 20 }}
                style={{ color: "#0194e9", marginRight: "15px" }}
              />
              <h4>Qəbz</h4>
            </div>
          </div>
        )}
        {eventActive && <AddAppointmentPanel status={updateEventActive} />}
        {customerActive && <AddCustomerPanel status={updateCustomerActive} />}
      </div>
      <div
        className={`${styles.serviceContainer} ${
          window.location.pathname === "/statistics" && styles.active
        }`}
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
