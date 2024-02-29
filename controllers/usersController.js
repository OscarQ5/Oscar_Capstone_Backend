const express = require('express')
const users = express.Router()
const { getUsers, getUser } = require('../queries/users')

users.get('/', async (req, res) => {
    try {
        const users = await getUsers()
        res.status(200).json(users)
    } catch (err) {
        res.status(404).json({ error: err })
    }
})

users.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await getUser(id);
        res.status(200).json(user);
    } catch (err) {
        res.status(404).json({ error: err });
    }
})

module.exports = users