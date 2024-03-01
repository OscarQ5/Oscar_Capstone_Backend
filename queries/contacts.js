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

module.exports = { getContacts, getContactById }