const express = require("express");
const medical = express.Router({ mergeParams: true });
const { getMedicals } = require("../queries/medical");

medical.get("/", async (req, res) => {
  const { user_id } = req.params;
  try {
    const userMedical = await getMedicals(user_id);
    res.status(200).json(userMedical);
  } catch (err) {
    res.status(404).json({ error: err });
  }
});


module.exports = medical