const express = require("express");
const medical = express.Router({ mergeParams: true });
const { getMedicals, createMedical } = require("../queries/medical");
const { getUser, getMedical } = require("../queries/users");

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

medical.get("/", async (req, res) => {
  const { user_id, id } = req.params;
  try {
    const userMedical = await getMedical(id);
    const users = await getUser(user_id);
    res.status(200).json({ ...users, userMedical });
  } catch (err) {
    res.status(404).json({ error: err });
  }
});

medical.post("/", async (req, res) => {
    const { user_id } = req.params
    const medical = await createMedical({ user_id, ...req.body })
    res.status(200).json(medical)
})


module.exports = medical