import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  venue: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  seats: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    default: ""
  }
});

const Event = mongoose.model("Event", eventSchema);

export default Event;