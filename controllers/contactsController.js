const express = require('express')
const contacts = express.Router({ mergeParams: true })
const { getContacts, getContactById, createContact, updateContact, deleteContact } = require('../queries/contacts')

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

contacts.post('/', async (req, res) => {
    const { firstname, lastname, phone_number } = req.body
    const { user_id } = req.params
    try {
        const newContact = await createContact({ firstname, lastname, phone_number, user_id })
        res.status(201).json(newContact)
    } catch (err) {
        res.status(404).json({ error: err })
    }
})

contacts.put('/:id', async (req, res) => {
    const { id } = req.params
    const { firstname, lastname, phone_number } = req.body
    try {
        await updateContact(id, { firstname, lastname, phone_number })
        res.status(200).json({ message: "Contact updated successfully" })
    } catch (err) {
        res.status(404).json({ error: err })
    }
})

contacts.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        await deleteContact(id)
        res.status(200).json({ message: "Contact deleted successfully" })
    } catch (err) {
        res.status(404).json({ error: err })
    }
})

module.exports = contacts