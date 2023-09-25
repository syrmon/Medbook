import { useState } from "react";
import styles from "./styles.module.css";
import { Done } from "@mui/icons-material";
import { useUpdateAppointmentMutation } from "state/api";

const AppointmentBox = (props) => {
  const [isChangeStatus, setIsChangeStatus] = useState(false);
  const [updateAppointment] = useUpdateAppointmentMutation();
  const data = props.data;
  return (
    <>
      {!isChangeStatus ? (
        <div
          className={`${styles.appointmentBox} ${
            data.appointment[0].status === "Bitdi"
              ? styles.skipped
              : styles.upcoming
          }`}
          onClick={() => {
            setIsChangeStatus(true);
          }}
        >
          <div className={`${styles.titles}`}>
            <h2 className={`${styles.name}`}>
              {data.name} {data.surname}
            </h2>
            <h3 className={`${styles.time}`}>{data.appointment[0].time}</h3>
          </div>
          <div className={`${styles.info}`}>
            <figure>
              <blockquote>
                <p className={`${styles.desc}`}>{data.appointment[0].desc}</p>
              </blockquote>
            </figure>
          </div>
        </div>
      ) : (
        <div
          className={`${styles.appointmentBox} ${styles.upcoming}`}
          onClick={() => {
            setIsChangeStatus(false);
          }}
        >
          <div className={`${styles.finishContainer}`}>
            <div
              className={`${styles.finish}`}
              onClick={() => {
                setIsChangeStatus(false);
                updateAppointment({
                  contactNumber: props.customerNumber,
                  date: data.appointment[0].date,
                });
                // window.location.reload(false);
              }}
            >
              <Done sx={{ fontSize: 30 }} style={{ color: "#0194e9" }} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AppointmentBox;
