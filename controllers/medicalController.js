const express = require("express");

const medical = express.Router({ mergeParams: true });

const { getUser } = require("../queries/users");

const { getMedicals, getMedical, newMedical, updateMedical, deleteMedical } = require("../queries/medical");

medical.get("/", async (req, res) => {
  const { user_id } = req.params;
  try {
      const userMedical = await getMedicals(user_id);
      const users = await getUser(user_id)
    res.status(200).json({...users, userMedical});
  } catch (err) {
    res.status(404).json({ error: err });
  }
});

//SHOW
medical.get("/", async (req, res) => {
  const { user_id, id } = req.params;
  try {
    const medical = await getMedical(id);
    const users = await getUser(user_id);
    res.status(200).json({ ...users, medical });
  } catch (err) {
    res.status(404).json({ error: err });
  }
});


//POST
medical.post("/", async (req, res) => {
    const { user_id } = req.params
    const medical = await newMedical({ user_id, ...req.body })
    res.status(200).json(medical)
})


//UPDATE
medical.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { medical_history, blood_type, allergies, medication } = req.body;
  try {
    await updateMedical(id, {
      medical_history,
      blood_type,
      allergies,
      medication,
    });
    res.status(200).json({ message: "Contact updated successfully" });
  } catch (err) {
    res.status(404).json({ error: err });
  }
});


// DELETE
medical.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMedical = await deleteMedical(id);
    if (!deletedMedical) {
      return res.status(404).json({ error: "Medical record not found" });
    }
    res.status(200).json({ message: "Medical record deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});




module.exports = medical