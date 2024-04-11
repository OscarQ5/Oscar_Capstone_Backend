const express = require("express");
const villages = express.Router({ mergeParams: true });
const {
  createVillage,
  getVillage,
  updateVillage,
  deleteVillage,
  getVillages,
  getAllVillages,
} = require("../queries/villages");
const { checkDuplicateVillage, checkAdminStatus } = require("../validations/checkVillages")
const { authenticateToken } = require("../auth/auth");
const { getUser } = require("../queries/users");
const { createVillageUser } = require("../queries/villageUsers");

villages.use(authenticateToken);

villages.post("/", checkDuplicateVillage, async (req, res) => {
  const { village_name } = req.body;
  try {
    const creator_id = req.user.user_id;
    const newVillage = await createVillage(village_name, creator_id);
    await createVillageUser(creator_id, newVillage.village_id, true)
    const creator = await getUser(newVillage.creator_id);
    newVillage.creator = creator;
    res.status(201).json(newVillage);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

villages.get("/village/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const village = await getVillage(id);
    if (!village) {
      res.status(404).json({ error: "Village not found" });
      return;
    }
    res.status(200).json(village);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

villages.get("/", async (req, res) => {
  const { user_id } = req.user;
  try {
    const userVillages = await getVillages(user_id);
    res.status(200).json(userVillages);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

villages.get("/allvillages", async (req, res) => {
  try {
    const allVillages = await getAllVillages()
    res.status(200).json(allVillages);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

villages.put("/:id", checkAdminStatus, async (req, res) => {
  const { id } = req.params;
  const { village_name } = req.body;
  try {
    await updateVillage(id, village_name);
    const updatedVillage = await getVillage(id);
    res.status(200).json(updatedVillage);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

villages.delete("/:id", checkAdminStatus, async (req, res) => {
  try {
    const { id } = req.params;
    await deleteVillage(id);
    res.status(200).json({ message: "Village deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

module.exports = villages;
