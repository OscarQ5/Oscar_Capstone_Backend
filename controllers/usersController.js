const express = require("express");
const users = express.Router();
require("dotenv").config();
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;
const {
  getUsers,
  getUser,
  createUser,
  logInUser,
  updateUser,
  deleteUser,
} = require("../queries/users");
const {
  checkRequiredFields,
  validateEmail,
  validatePhoneNumber,
  validateLoginInput,
  checkDuplicateEmail,
  checkDuplicatePhoneNumber,
  checkDuplicateUsername
} = require("../validations/checkUser.js")
const contactsController = require("./contactsController");
users.use("/contacts", contactsController);

const medicalController = require("./medicalController");
users.use("/medical", medicalController);

const villagesController = require("./villagesController");
users.use("/villages", villagesController);

const villageUsersController = require("./villageUsersController");
users.use("/village-users", villageUsersController);

const villageJoinRequestsController = require("./villageJoinRequestsController")
users.use("/villageJoinRequests", villageJoinRequestsController)

users.get("/", async (req, res) => {
  try {
    const users = await getUsers();
    res.status(200).json(users);
  } catch (err) {
    res.status(404).json({ error: err });
  }
});

users.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await getUser(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ error: err });
  }
});

users.post("/sign-up", checkRequiredFields, validateEmail, validatePhoneNumber, checkDuplicateUsername, checkDuplicateEmail, checkDuplicatePhoneNumber, async (req, res) => {
  try {
    const newUser = await createUser(req.body);
    const token = jwt.sign(
      { user_id: newUser.user_id, name: newUser.name, username: newUser.username },
      secret
    );
    res.status(201).json({ user: newUser, token });
  } catch (err) {
    res.status(500).json({ error: "Invalid Information", info: err });
  }
});

users.post("/login", validateLoginInput, async (req, res) => {
  try {
    const user = await logInUser(req.body);
    if (!user) {
      res.status(401).json({ error: "Invalid username or password" });
      return;
    }

    const token = jwt.sign(
      { user_id: user.user_id, name: user.name, username: user.username },
      secret
    );

    res.status(200).json({
      user: {
        user_id: user.user_id,
        name: user.name,
        username: user.username,
        phone_number: user.phone_number,
        email: user.email,
        status: user.status,
        is_admin: user.is_admin,
        profile_picture_url: user.profile_picture_url,
      },
      token,
    });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

users.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;
  try {
    await updateUser(id, updatedUser);
    res.status(200).json({ message: "User updated successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error updating user" });
  }
});

users.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await deleteUser(id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(404).json({ error: err });
  }
});

module.exports = users;
