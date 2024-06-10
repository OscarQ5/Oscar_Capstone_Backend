const express = require("express");
const contacts = express.Router({ mergeParams: true });
const {
  getContacts,
  getContactByIdAndUserId,
  createContact,
  updateContact,
  deleteContact,
} = require("../queries/contacts");
const { authenticateToken } = require("../auth/auth");

contacts.use(authenticateToken);

contacts.get("/", async (req, res) => {
  try {
    const userId = req.user.user_id;
    const userContacts = await getContacts(userId);
    res.status(200).json({ userContacts });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

contacts.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id } = req.user;
    const contact = await getContactByIdAndUserId(id, user_id);

    if (!contact) {
      return res.status(404).json({ error: "Contact not found" });
    }

    res.status(200).json({ contact });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

contacts.post("/", async (req, res) => {
  try {
    const { firstname, lastname, phone_number } = req.body;
    const user_id = req.user.user_id;
    const newContact = await createContact({
      firstname,
      lastname,
      phone_number,
      user_id,
    });
    res.status(201).json({ newContact });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

contacts.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { firstname, lastname, phone_number } = req.body;
  const userId = req.user.user_id;

  try {
    const contact = await getContactByIdAndUserId(id, userId);
    if (!contact) {
      return res.status(404).json({ error: "Contact not found or does not belong to the user" });
    }

    const updated = await updateContact(id, { firstname, lastname, phone_number }, userId);
    res.status(200).json({ updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

contacts.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const userId = req.user.user_id;

  try {
    const contact = await getContactByIdAndUserId(id, userId);
    if (!contact) {
      return res.status(404).json({ error: "Contact not found or does not belong to the user" });
    }

    const deletedContact = await deleteContact(id, userId);
    res.status(200).json({ deletedContact });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = contacts;
