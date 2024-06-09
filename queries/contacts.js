const db = require("../db/dbConfig");

const getContacts = async (user_id) => {
  const contacts = await db.any(
    "SELECT * FROM contacts WHERE user_id=$1",
    user_id
  )
  return contacts
};

const getContactByIdAndUserId = async (contact_id, user_id) => {
  const contact = await db.oneOrNone(
    "SELECT * FROM contacts WHERE contact_id=$1 AND user_id=$2",
    [contact_id, user_id]
  )
  return contact
};

const createContact = async (contact) => {
  const { firstname, lastname, phone_number, user_id } = contact;
  const newContact = await db.oneOrNone(
    "INSERT INTO contacts (firstname, lastname, phone_number, user_id) VALUES ($1, $2, $3, $4) RETURNING *",
    [firstname, lastname, phone_number, user_id]
  )
  return newContact
};

const updateContact = async (contact_id, updatedContact, user_id) => {
  
  const { firstname, lastname, phone_number } = updatedContact

  const updated = await db.oneOrNone(
    "UPDATE contacts SET firstname=$1, lastname=$2, phone_number=$3 WHERE contact_id=$4 AND user_id=$5 RETURNING *",
    [firstname, lastname, phone_number, contact_id, user_id]
  )
  return updated
};

const deleteContact = async (contact_id, user_id) => {

  const deletedContact = await db.oneOrNone("DELETE FROM contacts WHERE contact_id=$1 AND user_id=$2 RETURNING *", [
    contact_id,
    user_id,
  ])

  return deletedContact
};

module.exports = {
  getContacts,
  getContactByIdAndUserId,
  createContact,
  updateContact,
  deleteContact,
};
