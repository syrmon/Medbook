import React, { useState } from "react";
import styles from "./styles.module.css";
import AppointmentBox from "components/appointmentBox/AppointmentBox";
import { useGetAppointmentsQuery } from "state/api";
import Dashboard from "components/dashboard/Dashboard";
import Banner from "components/banner/Banner";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const Appointments = () => {
  const date = new Date();
  const month = (date.getMonth() + 1).toString().concat(".");
  const todaysDate = date
    .getDate()
    .toString()
    .concat(".")
    .concat(month.length > 1 ? month : "0" + month)
    .concat(date.getFullYear().toString());
  const [selectedDate, setSelectedDate] = useState(todaysDate);
  const { data, isLoading } = useGetAppointmentsQuery(selectedDate);

  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.bannerContainer}`}>
        <Banner />
      </div>

      <div className={`${styles.appointmentContainer}`}>
        <div className={`${styles.statisticsContainer}`}>
          <div className={`${styles.statisticCount}`}>
            <h3>Randevu sayı: </h3> &nbsp;&nbsp;
            <h3>{data && data.length}</h3>
          </div>
          <div className={`${styles.datePicker}`}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                variant="standard"
                format="DD-MM-YYYY"
                slotProps={{ textField: { placeholder: todaysDate } }}
                onChange={(date) => {
                  const selectedMonth = (date.$M + 1).toString().concat(".");
                  const selectedDate = date.$D
                    .toString()
                    .concat(".")
                    .concat(
                      selectedMonth.length > 1
                        ? selectedMonth
                        : "0" + selectedMonth
                    )
                    .concat(date.$y.toString());
                  setSelectedDate(selectedDate);
                }}
              />
            </LocalizationProvider>
          </div>
        </div>
        {data && data.length > 0
          ? data.map((appointment) => {
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

      <div className={`${styles.dashboardContainer}`}>
        <Dashboard />
      </div>
    </div>
  );
};

export default Appointments;
