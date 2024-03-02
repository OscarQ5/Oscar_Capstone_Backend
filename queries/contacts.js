const db = require('../db/dbConfig')

const getContacts = async (user_id) => {
    try {
        const contacts = await db.any("SELECT * FROM contacts WHERE user_id=$1", user_id)
        return contacts
    } catch (err) {
        return err
    }
}

const getContactById = async (contact_id) => {
    try {
        const contact = await db.one("SELECT * FROM contacts WHERE contact_id=$1", contact_id)
        return contact
    } catch (err) {
        return err
    }
}

const createContact = async (contact) => {
    const { firstname, lastname, phone_number, user_id } = contact
    try {
        const newContact = await db.one("INSERT INTO contacts (firstname, lastname, phone_number, user_id) VALUES ($1, $2, $3, $4) RETURNING *",
            [firstname, lastname, phone_number, user_id])
        return newContact
    } catch (err) {
        return err
    }
}

const updateContact = async (contactId, updatedContact) => {
    const { firstname, lastname, phone_number } = updatedContact
    try {
        const updated = await db.none("UPDATE contacts SET firstname=$1, lastname=$2, phone_number=$3 WHERE contact_id=$4",
            [firstname, lastname, phone_number, contactId])
        return updated
    } catch (err) {
        return err
    }
}

module.exports = { getContacts, getContactById, createContact, updateContact }