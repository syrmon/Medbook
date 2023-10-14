import { useState } from "react";
import styles from "./styles.module.css";
import { useAddReceipeMutation, useGetCustomersQuery } from "state/api";
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
import { dateOptimizer, timeOptimizer } from "components/tools/timeOptimizer";

const AddReceipePanel = (props) => {
  const [receipeTime, setTime] = useState("");
  const [workDesc, setWorkDesc] = useState("");
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState();
  const [amount, setAmount] = useState(0);
  const [outcome, setOutcome] = useState(0);
  const [outcomeDetails, setOutcomeDetails] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const paymentMethods = ["Kart", "Nağd"];
  const [customerNumber, sestCustomerNumber] = useState("");
  const [customer, setCustomer] = useState({});

  const customers = useGetCustomersQuery().data;
  const handleChange = (event) => {
    sestCustomerNumber(event.target.value);
  };

  const [addReceipe] = useAddReceipeMutation();

  const submitForm = (event) => {
    const time = timeOptimizer(receipeTime);
    const selectedDate = dateOptimizer(date);

    addReceipe({
      customer: customer,
      date: selectedDate,
      time: time,
      amount: amount,
      paymentMethod: paymentMethod,
      workDescription: workDesc,
      outcome: outcome,
      outcomeDetails: outcomeDetails,
    }).unwrap();

    handleClickOpen();
    event.preventDefault();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setWorkDesc("");
  };

  return (
    <form className={`${styles.container}`} onSubmit={submitForm}>
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
      <div></div>
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
            required
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

      <div className={`${styles.selectContainer}`}>
        <FormControl variant="standard" fullWidth>
          <InputLabel id="demo-simple-select-standard-label">
            Ödəniş üsulu
          </InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={paymentMethod}
            required
            label="Ödəniş üsulu"
          >
            {paymentMethods.map((c) => {
              return (
                <MenuItem value={c} onClick={() => setPaymentMethod(c)} key={c}>
                  {c}
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
        <div className={`${styles.nameContainer}`}>
          <TextField
            id="amount"
            label="Məbləğ"
            variant="standard"
            style={{ marginRight: "30px", width: "100%" }}
            onChange={(e) => setAmount(Number(e.target.value))}
            required
          />
          <TextField
            variant="standard"
            onChange={(e) => setWorkDesc(e.target.value)}
            multiline
            rows={1}
            value={workDesc}
            fullWidth
            label="Görülən iş"
            required
          ></TextField>
        </div>
      </div>
      <div className={`${styles.inputContainer}`}>
        <div className={`${styles.nameContainer}`}>
          <TextField
            id="amount"
            label="Xərc Məbləği"
            variant="standard"
            style={{ marginRight: "30px", width: "100%" }}
            onChange={(e) => setOutcome(Number(e.target.value))}
          />
          <TextField
            variant="standard"
            onChange={(e) => setOutcomeDetails(e.target.value)}
            multiline
            rows={1}
            value={outcomeDetails}
            fullWidth
            label="Xərc yeri"
          ></TextField>
        </div>
      </div>

      <div className={`${styles.addContainer}`}>
        <Button type="submit" variant="contained">
          Əlavə et
        </Button>
      </div>
    </form>
  );
};

export default AddReceipePanel;
