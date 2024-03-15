const express = require('express')
const villageUsers = express.Router({ mergeParams: true })
const { createVillageUser, getVillageUser, getUserByPhoneNumber, getUsersByVillageId, updateVillageUser, deleteVillageUser } = require('../queries/villageUsers')
const { authenticateToken } = require('../auth/auth')

villageUsers.use(authenticateToken)

villageUsers.post('/:id', async (req, res) => {
    try {
        const { user_id, village_id } = req.body
        const villageUser = await (createVillageUser(user_id, village_id, false))
        res.status(201).json(villageUser)
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

villageUsers.get('/:village_id', async (req,res) => {
    try {
        const { village_id } = req.params
        const users = await getUsersByVillageId(village_id)
        res.status(200).json(users)
    } catch (err) {
        res.status(500).json({ error: err})
    }
})

villageUsers.put('/:user_id', async (req,res) => {
    try {
        const { is_admin, user_id } = req.body
        //validate if auth user is admin of village
        const updatedUser = await updateVillageUser(user_id, is_admin)
        res.status(200).json(updatedUser)
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

villageUsers.delete('/:user_id', async (req,res) => {
    try {
        const { user_id } = req.body
        //check if auth user is admin of village
        const deletedUser = await deleteVillageUser(user_id)
        if(!deletedUser) return res.status(404).json({ error: "Village user not found"})

        res.status(200).json({message: "Village user deleted successfully"})
    } catch (err) {
        res.status(500).json({ error: err})
    }
})

module.exports = villageUsers