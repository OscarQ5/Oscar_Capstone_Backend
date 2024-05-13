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
  checkDuplicateUsername,
  isValidId
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
    const users = await getUsers()
    res.status(200).json(users)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

users.get("/:id", isValidId, async (req, res) => {
  const { id } = req.params
  try {
    const user = await getUser(id)
    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }
    res.status(200).json(user)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

users.post("/sign-up", checkRequiredFields, validateEmail, validatePhoneNumber, checkDuplicateUsername, checkDuplicateEmail, checkDuplicatePhoneNumber, async (req, res) => {
  try {
    const newUser = await createUser(req.body)
    if (!newUser) {
      return res.status(404).json({ error: "Failed to create user" })
    }

    const token = jwt.sign(
      { user_id: newUser.user_id, name: newUser.name, username: newUser.username },
      secret
    )
    res.status(201).json({ user: newUser, token })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

users.post("/login", validateLoginInput, async (req, res) => {
  try {
    const user = await logInUser(req.body)
    if (!user) {
      res.status(401).json({ error: "Invalid username or password" })
      return
    }

    const token = jwt.sign(
      { user_id: user.user_id, name: user.name, username: user.username },
      secret
    )

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
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

users.put("/:id", isValidId, async (req, res) => {
  try {
    const { id } = req.params
    const userById = await getUser(id)
    if (!userById) {
      res.status(404).json({ error: `User with id:${id} not found` })
      return
    }

    const user = req.body
    const updatedUser = await updateUser(id, user)
    res.status(200).json({ data: updatedUser })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

users.delete("/:id", isValidId, async (req, res) => {
  try {
    const { id } = req.params
    const deletedUser = await deleteUser(id)
    if (!deletedUser) {
      res.status(404).json({ error: `User with id:${id} not found` })
      return
    }

    res.status(200).json({ data: deletedUser })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = users