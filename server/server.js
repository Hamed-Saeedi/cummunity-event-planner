import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { env } from "node:process";
import Event from "./models/Event.js";
import Registration from "./models/Registration.js";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("CEP Backend is running!");
});

app.get("/test", (req, res) => {
  res.json({ message: "CEP API is working!" });
});

// Get all events
app.get("/events", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Save a new event
app.post("/events", async (req, res) => {
  try {
    const event = await Event.create(req.body);
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Save a registration
app.post("/registrations", async (req, res) => {
  try {
    const registration = await Registration.create(req.body);
    res.status(201).json(registration);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all registrations
app.get("/registrations", async (req, res) => {
  try {
    const registrations = await Registration.find();
    res.json(registrations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.delete("/registrations/:id", async (req, res) => {
  try {
    const registration = await Registration.findByIdAndDelete(
      req.params.id
    );

    if (!registration) {
      return res.status(404).json({
        message: "Registration not found"
      });
    }

    res.json({
      message: "Registration deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});
app.put("/registrations/:id", async (req, res) => {
  try {
    const registration = await Registration.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        email: req.body.email,
        quantity: req.body.quantity,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!registration) {
      return res.status(404).json({
        message: "Registration not found",
      });
    }

    res.json(registration);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Connect to MongoDB and start server
mongoose
  .connect(env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB Connected!");

    app.listen(5000, () => {
      console.log("Server is running on port 5000");
    });
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error.message);
  });