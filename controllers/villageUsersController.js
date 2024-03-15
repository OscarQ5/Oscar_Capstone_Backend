const express = require("express");
const villageUsers = express.Router({ mergeParams: true });
const {
  createVillageUser,
  getVillageUser,
  getUserByPhoneNumber,
  getUsersByVillageId,
  updateVillageUser,
  deleteVillageUser,
} = require("../queries/villageUsers");
const { authenticateToken } = require("../auth/auth");

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
    console.error(err);
    res.status(500).json({ error: err.message }); // Send detailed error message
  }
});

villageUsers.get("/:village_id", async (req, res) => {
  try {
    const { village_id } = req.params;
    const users = await getUsersByVillageId(village_id);
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

villageUsers.put("/:village_user_id", async (req, res) => {
  try {
    const { village_user_id } = req.params;
    const { is_admin } = req.body;
    //validate if auth user is admin of village
    const updatedUser = await updateVillageUser(village_user_id, is_admin);
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

villageUsers.delete("/:village_user_id", async (req, res) => {
  try {
    const { village_user_id } = req.params;
    //check if auth user is admin of village
    const deletedUser = await deleteVillageUser(village_user_id);
    if (!deletedUser)
      return res.status(404).json({ error: "Village user not found" });

    res.status(200).json({ message: "Village user deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

module.exports = villageUsers;