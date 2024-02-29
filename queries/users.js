const db = require('../db/dbConfig')

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

module.exports = { getUsers, getUser }