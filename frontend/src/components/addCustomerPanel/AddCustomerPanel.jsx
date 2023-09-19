import styles from "./styles.module.css";
import { useState } from "react";
import { useAddCustomerMutation } from "state/api";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  TextField,
} from "@mui/material";

const AddCustomerPanel = (props) => {
  const [contactNumber, setContactNumber] = useState("");
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [surname, setSurname] = useState("");
  const [open, setOpen] = useState(false);

  const [addCustomer] = useAddCustomerMutation();

  const submitForm = () => {
    addCustomer({
      name,
      surname,
      contactNumber,
      birthDate,
    }).unwrap();

    setName("");
    setSurname("");
    setContactNumber("");
    setBirthDate("");
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
        <DialogTitle>{"Müştəri başarı ilə əlavə edildi!"}</DialogTitle>
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
      <div className={`${styles.inputContainer}`}>
        <div className={`${styles.nameContainer}`}>
          <TextField
            id="name"
            label="Ad"
            variant="standard"
            style={{ marginRight: "30px" }}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            id="surname"
            label="Soyad"
            variant="standard"
            onChange={(e) => setSurname(e.target.value)}
          />
        </div>
      </div>
      <div className={`${styles.inputContainer}`}>
        <div className={`${styles.nameContainer}`}>
          <TextField
            id="contactNumber"
            label="Əlaqə nömrəsi"
            variant="standard"
            style={{ marginRight: "30px" }}
            onChange={(e) => setContactNumber(e.target.value)}
          />
          <TextField
            id="birthDate"
            label="Doğum Tarixi"
            variant="standard"
            onChange={(e) => setBirthDate(e.target.value)}
          />
        </div>
      </div>
      <div className={`${styles.addContainer}`} onClick={submitForm}>
        <Button variant="contained">Əlavə et</Button>
      </div>
    </div>
  );
};
export default AddCustomerPanel;
