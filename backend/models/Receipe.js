import mongoose from "mongoose";

const ReceipeSchema = new mongoose.Schema({
  amount: Double,
  paymentMethod: String,
  date: String,
  //Depbt
  workDescription: String,
  outcome: double,
  outcomeDetails: String,
});

const Receipe = mongoose.model("Receipe", ReceipeSchema);
export default Receipe;
