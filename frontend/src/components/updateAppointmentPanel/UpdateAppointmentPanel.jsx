import { useState } from "react";
import styles from "./styles.module.css";
import {
  useAddAppointmentMutation,
  useGetCustomersQuery,
  useUpdateAppointmentMutation,
} from "state/api";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers";

const UpdateAppointmentPanel = (props) => {
  const customer = props.customer;
  const [customerTime, setTime] = useState("");
  const [date, setDate] = useState();
  const [open, setOpen] = useState(false);

  const [updateAppointment] = useUpdateAppointmentMutation();

  const submitForm = () => {
    const month = (date.$M + 1).toString();
    const time = (
      customerTime.$H.toString().length > 1
        ? customerTime.$H.toString()
        : "0" + customerTime.$H.toString()
    ).concat(
      ":" +
        (customerTime.$m.toString().length > 1
          ? customerTime.$m.toString()
          : "0" + customerTime.$m.toString())
    );

    const currentDate = new Date();
    const currentMonth = (currentDate.getMonth() + 1).toString();
    const todaysDate = currentDate
      .getDate()
      .toString()
      .concat(".")
      .concat(currentMonth.length > 1 ? currentMonth : "0" + currentMonth + ".")
      .concat(currentDate.getFullYear().toString());

    const selectedDate = date.$D
      .toString()
      .concat(".")
      .concat(month.length > 1 ? month : "0" + month + ".")
      .concat(date.$y.toString());

    updateAppointment({
      date: todaysDate,
      newDate: { date: selectedDate, time: time },
      contactNumber: customer.contactNumber,
    }).unwrap();

    handleClickOpen();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={`${styles.container}`}>
      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Növbə uğurla yeniləndi!"}</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Ok</Button>
        </DialogActions>
      </Dialog>
      <div className={`${styles.closeContainer}`}>
        <div
          onClick={() => {
            props.status(false);
            window.location.reload(false);
          }}
          className={`${styles.closeButton}`}
        >
          X
        </div>
      </div>
      <div className={`${styles.customerContainer}`}>
        <h3>
          {customer.name}&nbsp;{customer.surname}
        </h3>
      </div>
      <div className={`${styles.inputContainer}`}>
        <div className={`${styles.nameContainer}`}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              label="Vaxt"
              onChange={(newValue) => {
                setTime(newValue);
              }}
              className={`${styles.timePicker}`}
              ampm={false}
            />
            <DatePicker
              variant="standard"
              format="DD-MM-YYYY"
              onChange={(a) => setDate(a)}
            />
          </LocalizationProvider>
        </div>
      </div>
      <div className={`${styles.addContainer}`} onClick={submitForm}>
        <Button variant="contained">Yenilə</Button>
      </div>
    </div>
  );
};

export default UpdateAppointmentPanel;
