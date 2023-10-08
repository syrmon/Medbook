import React, { useState } from "react";
import styles from "./styles.module.css";
import AppointmentBox from "components/appointmentBox/AppointmentBox";
import { useGetAppointmentsQuery } from "state/api";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { dateOptimizer, getCurrentDate } from "components/tools/timeOptimizer";

const Appointments = () => {
  const todaysDate = getCurrentDate();

  const [selectedDate, setSelectedDate] = useState(todaysDate);
  const { data, isLoading } = useGetAppointmentsQuery(selectedDate);

  return (
    <div className={`${styles.container}`}>
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
                  const selectedDate = dateOptimizer(date);
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
    </div>
  );
};

export default Appointments;
