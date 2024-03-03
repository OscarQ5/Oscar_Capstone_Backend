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
  const { id, user_id } = req.params;
  const updatedMedical = await updateMedical({ user_id, id, ...req.body });
  if (updatedMedical.id) {
    res.status(200).json(updatedMedical);
  } else {
    res.status(404).json("Medical History not found");
  }
});


// DELETE
medical.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deletedMedical = await deleteMedical(id);
  if (deletedReview.id) {
    res.status(200).json(deletedMedical);
  } else {
    res.status(404).json({ error: "Medical Historynot found" });
  }
});




module.exports = medical