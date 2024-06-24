const express = require("express");
const villageUsers = express.Router({ mergeParams: true });
const {
  createVillageUser,
  getUsersByVillageId,
  updateVillageUser,
  deleteVillageUser,
} = require("../queries/villageUsers");
const { authenticateToken } = require("../auth/auth");
const { checkAdminStatus } = require("../validations/checkVillages");

villageUsers.use(authenticateToken);

villageUsers.post("/", async (req, res) => {
  try {
    const { village_id, user_id } = req.body;
    if (!village_id || !user_id) {
      return res
        .status(400)
        .json({ error: "Both village_id and user_id are required." });
    }
    const villageUser = await createVillageUser(user_id, village_id, false);
    res.status(201).json(villageUser);
  } catch (err) {
    res.status(500).json({ error: err.message }); 
  }
});

villageUsers.get("/:village_id", async (req, res) => {
  try {
    const { village_id } = req.params;
    const users = await getUsersByVillageId(village_id);
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

villageUsers.put("/:village_user_id", checkAdminStatus, async (req, res) => {
  try {
    const { village_user_id } = req.params;
    const { is_admin } = req.body;
    const updatedUser = await updateVillageUser(village_user_id, is_admin);
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

villageUsers.delete("/:village_user_id", checkAdminStatus, async (req, res) => {
  try {
    const { village_user_id } = req.params;
    const deletedUser = await deleteVillageUser(village_user_id);
    if (!deletedUser)
      return res.status(404).json({ error: "Village user not found" });

    res.status(200).json({ deletedUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = villageUsers;