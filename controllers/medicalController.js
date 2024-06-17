const express = require("express");
const medical = express.Router({ mergeParams: true });
const {
  getMedicals,
  getMedical,
  newMedical,
  updateMedical,
  deleteMedical,
} = require("../queries/medical");
const { authenticateToken } = require("../auth/auth");

medical.use(authenticateToken);

medical.get("/", async (req, res) => {
  try {
    const { user_id } = req.user;
    const userMedical = await getMedicals(user_id);
    res.status(200).json(userMedical);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

medical.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const { user_id } = req.user;
    const medical = await getMedical(id, user_id);
    if (!medical) return res.status(404).json({ error: "Medical record not found or does not belong to the user", });
    res.status(200).json(medical);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

medical.post("/", async (req, res) => {
  try {
    const { medical_history, blood_type, allergies, medication } = req.body;
    const { user_id } = req.user;
    const medical = await newMedical({
      medical_history,
      blood_type,
      allergies,
      medication,
      user_id,
    });
    res.status(201).json(medical);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

medical.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { medical_history, blood_type, allergies, medication } = req.body;
  try {
    const { user_id } = req.user;
    const medical = await getMedical(id, user_id);
    if (!medical) {
      return res.status(404).json({ error: "Medical record not found or does not belong to the user" });
    }
    const updatedMedical = await updateMedical(id, {
      medical_history,
      blood_type,
      allergies,
      medication,
    });
    res.status(200).json({ updatedMedical });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

medical.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id } = req.user;
    const medical = await getMedical(id, user_id);
    if (!medical) {
      return res.status(404).json({ error: "Medical record not found or does not belong to the user" });
    }
    const deletedMedical = await deleteMedical(id);
    res.status(200).json({ deletedMedical });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = medical;