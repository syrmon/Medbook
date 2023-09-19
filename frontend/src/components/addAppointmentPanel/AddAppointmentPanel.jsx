import { useState } from "react";
import styles from "./styles.module.css";
import {
  useAddAppointmentMutation,
  useGetCustomersQuery,
} from "state/api";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers";

const AddAppointmentPanel = (props) => {
  const [customerNumber, sestCustomerNumber] = useState("");
  const [customer, setCustomer] = useState({});
  const [customerTime, setTime] = useState("");
  const [customerDesc, setCustomerDesc] = useState("");
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState();

  const customers = useGetCustomersQuery().data;
  const [addCustomer] = useAddAppointmentMutation();
  const handleChange = (event) => {
    sestCustomerNumber(event.target.value);
  };

  const submitForm = () => {
    const month = (date.$M + 1).toString();
    const time = (
      customerTime.$H.toString().length > 1
        ? customerTime.$H.toString()
        : "0" + customerTime.$H.toString()
    ).concat(
      ":" + (customerTime.$m.toString().length > 1
        ? customerTime.$m.toString()
        : "0" + customerTime.$m.toString())
    );

    const selectedDate = date.$D
      .toString()
      .concat("." + month.length > 1 ? month : "0" + month + ".")
      .concat(date.$y.toString());

    addCustomer({
      customer: customer,
      date: selectedDate,
      time: time,
      desc: customerDesc,
    }).unwrap();

    handleClickOpen();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCustomer({});
    sestCustomerNumber({});
    setCustomerDesc("");
  };

  return (
    <div className={`${styles.container}`}>
      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Randevu başarı ilə əlavə edildi!"}</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Ok</Button>
        </DialogActions>
      </Dialog>
      <div className={`${styles.closeContainer}`}>
        <div
          onClick={() => props.status(false)}
          className={`${styles.closeButton}`}
        >
          X
        </div>
      </div>
      <div className={`${styles.selectContainer}`}>
        <FormControl variant="standard" fullWidth>
          <InputLabel id="demo-simple-select-standard-label">
            Müştəri
          </InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={customerNumber}
            onChange={handleChange}
            label="Müştəri"
          >
            {customers &&
              customers.map((c) => {
                return (
                  <MenuItem
                    value={c.contactNumber}
                    onClick={() => setCustomer(c)}
                    key={c.contactNumber}
                  >
                    {c.name} {c.surname}
                  </MenuItem>
                );
              })}
          </Select>
        </FormControl>
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
      <div className={`${styles.inputContainer}`}>
        <TextField
          variant="standard"
          onChange={(e) => setCustomerDesc(e.target.value)}
          multiline
          rows={3}
          value={customerDesc}
          fullWidth
          label="Şikayət"
        ></TextField>
      </div>

      <div className={`${styles.addContainer}`} onClick={submitForm}>
        <Button variant="contained">Əlavə et</Button>
      </div>
    </div>
  );
};

export default AddAppointmentPanel;
