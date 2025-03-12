import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import express from "express";
import cors from "cors";
import axios from "axios";

admin.initializeApp();

const app = express();

app.use(cors({ origin: true })); // Izinkan akses dari semua origin (bisa dibatasi jika perlu)

// Contoh endpoint API sederhana
app.get("/fetch-user-data", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1] || "";
  axios.defaults.headers.common = { Authorization: `bearer ${token}` };

  try {
    const response = await axios.get("http://localhost:5000/api/fetch-user-data"); // Ganti URL ini sesuai dengan URL backend kamu
    res.status(200).send(response.data);
  } catch (error) {
    console.error("Error accessing backend-repo:", error);
    res.status(500).send("Failed to connect to backend-repo.");
  }
});

exports.api = functions.https.onRequest(app);
