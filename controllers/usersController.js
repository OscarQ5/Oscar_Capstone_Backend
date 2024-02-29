const express = require('express')
const users = express.Router()
require("dotenv").config()
const jwt = require('jsonwebtoken')
const secret = process.env.SECRET
const { getUsers, getUser, createUser } = require('../queries/users')

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

users.post('/', async (req, res) => {
    try {
        const newUser = await createUser(req.body)
        const token = jwt.sign({ user_id: newUser.user_id, name: newUser.name }, secret)
        res.status(201).json({ user: newUser, token })
    } catch (err) {
        res.status(500).json({ error: "Invalid Information", info: err })
    }
})

module.exports = users