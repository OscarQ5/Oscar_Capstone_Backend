const db = require('../db/dbConfig')
const bcrypt = require('bcrypt')

// for development purposes only
const getUsers = async () => {
    try {
        const users = await db.any("SELECT * FROM users")
        return users
    } catch (err) {
        return err
    }
}

const getUser = async (id) => {
    try {
        const user = await db.one("SELECT * FROM users WHERE user_id=$1", id)
        return user
    } catch (err) {
        return err
    }
}

const createUser = async (user) => {
    try {
        const { name, password_hash, email, phone_number, profile_picture_url } = user
        const salt = 10
        const hash = await bcrypt.hash(password_hash, salt)
        const profilePic = profile_picture_url ? profile_picture_url : '/static/default_profile_pic.webp'
        const newUser = await db.one("INSERT INTO users (name, password_hash, email, phone_number, profile_picture_url) VALUES ($1, $2, $3, $4, $5) RETURNING *", [name, hash, email, phone_number, profilePic])
        return newUser
    } catch (err) {
        return err
    }
}

const logInUser = async (user) => {
    try {
        const loggedInUser = await db.oneOrNone("SELECT * FROM users WHERE phone_number=$1", user.phone_number)
        if (!loggedInUser) return false
        const passwordMatch = await bcrypt.compare(user.password_hash, loggedInUser.password_hash)
        if (!passwordMatch) return false
        return loggedInUser
    } catch (err) {
        return err
    }
}

const updateUser = async (id, updatedUser) => {
    try {
        const { name, password_hash, email, phone_number, profile_picture_url } = updatedUser
        const salt = 10
        const hash = await bcrypt.hash(password_hash, salt)
        const profilePic = profile_picture_url ? profile_picture_url : '/static/default_profile_pic.webp'
        const updated = await db.none("UPDATE users SET name=$1, password_hash=$2, email=$3, phone_number=$4, profile_picture_url=$5 WHERE user_id=$6 RETURNING *", [name, hash, email, phone_number, profilePic, id])
        return updated
    } catch (err) {
        return err
    }
}

const deleteUser = async (id) => {
    try {
        const deletedUser = await db.none("DELETE FROM users WHERE user_id=$1", id)
        return deletedUser
    } catch (err) {
        return err
    }
}

module.exports = { getUsers, getUser, createUser, logInUser, updateUser, deleteUser }