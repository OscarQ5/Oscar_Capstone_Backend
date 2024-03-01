const express = require('express')
const contacts = express.Router({ mergeParams: true})
const { getContacts, getContactById } = require('../queries/contacts')

contacts.get('/', async (req, res) => {
    const { user_id } = req.params
    try {
        const userContacts = await getContacts(user_id)
        res.status(200).json(userContacts)
    } catch (err) {
        res.status(404).json({ error: err })
    }
})

contacts.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const contact = await getContactById(id)
        res.status(200).json(contact)
    } catch (err) {
        res.status(404).json({ error: "Contact not found" })
    }
})

module.exports = contacts