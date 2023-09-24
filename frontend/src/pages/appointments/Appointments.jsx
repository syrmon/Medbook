import React from "react";
import styles from "./styles.module.css";
import AppointmentBox from "components/appointmentBox/AppointmentBox";
import { useGetAppointmentsQuery } from "state/api";
import Dashboard from "components/dashboard/Dashboard";
import Banner from "components/banner/Banner";

const Appointments = () => {
  const { data, isLoading } = useGetAppointmentsQuery();
  const myData = [];

  const appointmentCountIncreaser = () => {
    let appointmentCount = 0;

    for (let i = 0; i < myData.length; i++) {
      if (myData[i] !== false) {
        appointmentCount++;
      }
    }

    return appointmentCount;
  };

  const updateArray = () => {
    for (let i = 0; i < data.length; i++) {
      data.map((a) => {
        return myData.length !== data.length && myData.push(a);
      });
    }
    sortData();
  };

  const sortData = () => {
    myData.sort(function compFunc(a, b) {
      if (a === false || a === undefined || b === false || b === undefined) {
        return 0;
      }
      const appointmentA = a.appointment[0].time;
      const appointmentB = b.appointment[0].time;

      const timeFirst = Number(appointmentA.substring(0, 2));
      const timeSecond = Number(appointmentA.substring(3, 5));

      const timeBFirst = Number(appointmentB.substring(0, 2));
      const timeBSecond = Number(appointmentB.substring(3, 5));

      if (timeFirst < timeBFirst) {
        return -1;
      }
      if (timeFirst > timeBFirst) {
        return 1;
      }
      if (timeFirst === timeBFirst && timeSecond < timeBSecond) {
        return -1;
      }
      if (timeFirst === timeBFirst && timeSecond > timeBSecond) {
        return 1;
      }
      return 0;
    });
  };

  data !== undefined && myData.length < 1 && updateArray();

  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.dashboardContainer}`}>
        <Dashboard />
      </div>
      <div className={`${styles.appointmentContainer}`}>
        <div className={`${styles.statisticsContainer}`}>
          <h3>Randevu sayı: </h3> <h3>{appointmentCountIncreaser()}</h3>
        </div>
        {myData.length > 0
          ? myData.map((appointment) => {
              return (
                appointment !== false && (
                  <AppointmentBox
                    customerNumber={appointment.contactNumber}
                    data={appointment}
                    key={appointment.name}
                  />
                )
              );
            })
          : isLoading && ""}
      </div>
      <Banner />
    </div>
  );
};

export default Appointments;
