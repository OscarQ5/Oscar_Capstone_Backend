const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
const path = require("path");
const usersController = require("./controllers/usersController");

app.use(cors());
app.use(express.json());
app.use("/users", usersController);
app.use("/static", express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.json({ index: "This is the index page" });
});

const API_KEY = "AIzaSyDfzCtuefPpjRO2CKPJceBpqlNW_MyUPd0";

app.get("/nearest", async (req, res) => {
  const { type, lat, lng } = req.query;

  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json`,
      {
        params: {
          location: `${lat},${lng}`,
          radius: 5000,
          type: type,
          key: API_KEY,
        },
      }
    );

    if (
      response.data &&
      response.data.results &&
      response.data.results.length > 0
    ) {
      const nearestPlace = response.data.results[0];
      const { name, geometry } = nearestPlace;
      const { lat, lng } = geometry.location;

      res.json({ name, latitude: lat, longitude: lng });
    } else {
      res.status(404).json({ error: `No ${type} found nearby.` });
    }
  } catch (error) {
    console.error("Error fetching nearest place:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
module.exports = app;
