import mongoose from "mongoose";


const CustomerSchema = new mongoose.Schema({
  name: String,
  surname: String,
  birthDate: String,
  //Depbt
  appointments: Array,
  contactNumber: String,
  receipes: Array,
});

const Customer = mongoose.model("Customer", CustomerSchema);
export default Customer;
