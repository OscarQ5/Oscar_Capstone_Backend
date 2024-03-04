const db = require('../db/dbConfig')

const getContacts = async (user_id) => {
    try {
        const contacts = await db.any("SELECT * FROM contacts WHERE user_id=$1", user_id)
        return contacts
    } catch (err) {
        return err
    }
}

const getContactByIdAndUserId = async (contact_id, user_id) => {
    try {
        const contact = await db.oneOrNone("SELECT * FROM contacts WHERE contact_id=$1 AND user_id=$2", [contact_id, user_id])
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

const updateContact = async (contact_id, updatedContact, user_id) => {
    try {
        const contact = await getContactByIdAndUserId(contact_id, user_id)
        if (!contact) {
            throw new Error("Contact not found or does not belong to the user");
        }

        const { firstname, lastname, phone_number } = updatedContact
        await db.none("UPDATE contacts SET firstname=$1, lastname=$2, phone_number=$3 WHERE contact_id=$4 AND user_id=$5",
        [firstname, lastname, phone_number, contact_id, user_id])

        const updated = await getContactByIdAndUserId(contact_id, user_id)
        return updated
    } catch (err) {
        return err
    }
}

const deleteContact = async (contact_id, user_id) => {
    try {
        const contact = await getContactByIdAndUserId(contact_id, user_id)
        if (!contact) {
            throw new Error("Contact not found or does not belong to the user")
        }

        await db.none("DELETE FROM contacts WHERE contact_id=$1 AND user_id=$2", [contact_id, user_id])
    } catch (err) {
        return err
    }
}

module.exports = { getContacts, getContactByIdAndUserId, createContact, updateContact, deleteContact }