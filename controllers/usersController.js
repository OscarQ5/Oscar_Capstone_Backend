const express = require('express')
const users = express.Router()
const { getUsers } = require('../queries/users')

users.get('/', async (req, res) => {
    try {
        const users = await getUsers()
        res.status(200).json(users)
    } catch (err) {
        res.status(404).json({ error: err })
    }
})

module.exports = users