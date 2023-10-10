import mongoose from "mongoose";

const ReceipeSchema = new mongoose.Schema({
  amount: Number,
  paymentMethod: String,
  date: String,
  time: String,
  //Depbt
  workDescription: String,
  outcome: Number,
  outcomeDetails: String,
});

const Receipe = mongoose.model("Receipe", ReceipeSchema);
export default Receipe;
