const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const Prediction = require("./Prediction");

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

mongoose.connect("mongodb://ojast01:Tyagi%40ojas01@ac-x1pn7os-shard-00-00.urjlcbj.mongodb.net:27017,ac-x1pn7os-shard-00-01.urjlcbj.mongodb.net:27017,ac-x1pn7os-shard-00-02.urjlcbj.mongodb.net:27017/healthcare?ssl=true&replicaSet=atlas-wbzs0k-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Error:", err.message));

app.get("/", (req, res) => {
  res.send("Backend Running");
});

// ── LOGIN ──────────────────────────────────────────────────────────────────
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (email === "admin@gmail.com" && password === "admin123") {
    res.json({ success: true });
  } else {
    res.json({ success: false, message: "Invalid email or password" });
  }
});

// ── PREDICT ────────────────────────────────────────────────────────────────
app.post("/predict", async (req, res) => {
  const { age, bloodPressure, sugarLevel } = req.body;

  // Step 1: Calculate prediction (this always works, no database needed)
  let prediction = "";
  let score = 0;

  if (age > 50 || bloodPressure > 140 || sugarLevel > 180) {
    prediction = "High Risk";
    score = Math.floor(Math.random() * 20) + 80;
  } else if (age > 35 || bloodPressure > 120 || sugarLevel > 140) {
    prediction = "Medium Risk";
    score = Math.floor(Math.random() * 30) + 40;
  } else {
    prediction = "Low Risk";
    score = Math.floor(Math.random() * 30) + 10;
  }

  const details =
    prediction === "High Risk"
      ? "Patient requires immediate clinical attention."
      : prediction === "Medium Risk"
      ? "Patient requires routine monitoring and lifestyle adjustments."
      : "Patient requires standard preventative care.";

  // Step 2: Try to save to MongoDB (if it fails, we still send the result)
  try {
    await Prediction.create({
      age,
      bp: bloodPressure,
      sugar: sugarLevel,
      prediction
    });
    console.log("Saved to MongoDB ✅");
  } catch (err) {
    console.log("MongoDB save failed (check IP whitelist):", err.message);
    // We do NOT return here — prediction still works!
  }

  // Step 3: Always send result back to frontend
  res.json({
    success: true,
    level: prediction,
    score,
    details
  });
});

// ── DASHBOARD ──────────────────────────────────────────────────────────────
app.get("/dashboard", async (req, res) => {
  try {
    const data = await Prediction.find().sort({ createdAt: -1 });

    const high   = data.filter(p => p.prediction === "High Risk").length;
    const medium = data.filter(p => p.prediction === "Medium Risk").length;
    const low    = data.filter(p => p.prediction === "Low Risk").length;

    res.json({
      summary: { total: data.length, high, medium, low },
      recentPredictions: data.slice(0, 10)
    });

  } catch (error) {
    // If MongoDB fails, return empty data instead of crashing
    res.json({
      summary: { total: 0, high: 0, medium: 0, low: 0 },
      recentPredictions: []
    });
  }
});

// ── CONTACT ────────────────────────────────────────────────────────────────
app.post("/contact", (req, res) => {
  const { name, email, subject, message } = req.body;
  console.log("Contact form submission:", { name, email, subject, message });
  res.json({ success: true });
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
