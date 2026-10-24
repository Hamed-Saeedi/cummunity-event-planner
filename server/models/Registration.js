import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  registeredAt: {
    type: Date,
    default: Date.now,
  },
});

const Registration = mongoose.model("Registration", registrationSchema);

export default Registration;