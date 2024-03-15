const db = require("../db/dbConfig");

const getUserByPhoneNumber = async (phone_number) => {
  try {
    const user = await db.oneOrNone(
      "SELECT * FROM users WHERE phone_number=$1",
      phone_number
    );
    return user;
  } catch (err) {
    return err;
  }
};

const createVillageUser = async (user_id, village_id, is_admin) => {
  try {
    const villageUser = await db.one(
      "INSERT INTO village_users (user_id, village_id, is_admin) VALUES ($1, $2, $3) RETURNING *",
      [user_id, village_id, is_admin]
    );
    return villageUser;
  } catch (err) {
    return err;
  }
};

const getUsersByVillageId = async (village_id) => {
  try {
    const users = await db.any(
      "SELECT * FROM village_users WHERE village_id=$1",
      village_id
    );
    return users;
  } catch (err) {
    return err;
  }
};

const updateVillageUser = async (village_user_id, is_admin) => {
  try {
    const updatedUser = await db.oneOrNone(
      "UPDATE village_users SET is_admin=$1 WHERE user_id=$2 RETURNING *",
      [is_admin, village_user_id]
    );
    return updatedUser;
  } catch (err) {
    return err;
  }
};

const deleteVillageUser = async (village_user_id) => {
  try {
    const deletedUser = await db.oneOrNone(
      "DELETE FROM village_users WHERE user_id=$1 RETURNING *",
      village_user_id
    );
    return deletedUser;
  } catch (err) {
    return err;
  }
};

const getVillageUser = async (village_id, user_id) => {
  try {
    const villageUser = await db.one(
      "SELECT * FROM village_users WHERE village_id=$1 AND user_id=$2",
      [village_id, user_id]
    );
    return villageUser;
  } catch (err) {
    return err;
  }
};

module.exports = {
  createVillageUser,
  getVillageUser,
  getUserByPhoneNumber,
  getUsersByVillageId,
  updateVillageUser,
  deleteVillageUser,
};
