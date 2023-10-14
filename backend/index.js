import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import customerRoutes from "./routes/customer.js";
import receipeRoutes from "./routes/receipe.js";
import appointmentRoutes from "./routes/appointment.js";
import statisticRoutes from "./routes/statistic.js";
import Appointment from "./models/Appointments.js";
import Customer from "./models/Customer.js";
// import http from "http";

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app._router.use(cors());

app.use("/customer", customerRoutes);
app.use("/receipes", receipeRoutes);
app.use("/appointments", appointmentRoutes);
app.use("/statistics", statisticRoutes);

// const httpServer = http.createServer(app);

/* Mongoose setup */
const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
    //Appointment.insertMany(appointments);
  })
  .catch((error) => console.log(`${error} did not connect`));
