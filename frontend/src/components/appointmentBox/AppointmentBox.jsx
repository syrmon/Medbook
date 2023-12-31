import { useState } from "react";
import styles from "./styles.module.css";
import { Sync, Undo, Done } from "@mui/icons-material";
import { useUpdateAppointmentMutation } from "state/api";
import UpdateAppointmentPanel from "components/updateAppointmentPanel/UpdateAppointmentPanel";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
const AppointmentBox = (props) => {
  const [isChangeStatus, setIsChangeStatus] = useState(false);
  const [updateAppointment] = useUpdateAppointmentMutation();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const data = props.data;

  const updateDialogStatus = (status) => {
    setDialogOpen(status);
    setIsChangeStatus(false);
  };

  const handleClickOpen = () => {
    console.log(data.appointment.date)
    updateAppointment({
      contactNumber: props.customerNumber,
      date: data.appointment.date,
    }).unwrap();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    window.location.reload(false);
  };

  return (
    <>
      {!isChangeStatus ? (
        <div
          className={`${styles.appointmentBox} ${
            data.appointment.status === "Bitdi"
              ? styles.skipped
              : data.appointment.status === "Changed"
              ? styles.changed
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
            <h3 className={`${styles.time}`}>{data.appointment.time}</h3>
          </div>
          <div className={`${styles.info}`}>
            <figure>
              <blockquote>
                <p className={`${styles.desc}`}>{data.appointment.desc}</p>
              </blockquote>
            </figure>
          </div>
        </div>
      ) : (
        <div
          className={`${styles.appointmentBox} ${styles.upcoming} ${styles.statusUpdaterBox}`}
        >
          <div
            className={`${styles.undoContainer}`}
            onClick={() => setIsChangeStatus(false)}
          >
            <Undo sx={{ fontSize: 25 }} style={{ color: "#0194e9" }} />
          </div>
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
          <div className={`${styles.finishContainer}`}>
            <div
              className={`${styles.finish}`}
              onClick={() => {
                handleClickOpen();
              }}
            >
              <Done sx={{ fontSize: 30 }} style={{ color: "#0194e9" }} />
            </div>
          </div>
          <div className={`${styles.updateContainer}`}>
            <div
              className={`${styles.updateButton}`}
              onClick={() => {
                setDialogOpen(true);
              }}
            >
              <Sync sx={{ fontSize: 30 }} style={{ color: "#0194e9" }} />
            </div>
          </div>

          {isDialogOpen && (
            <UpdateAppointmentPanel
              status={updateDialogStatus}
              customer={data}
            />
          )}
        </div>
      )}
    </>
  );
};

export default AppointmentBox;
