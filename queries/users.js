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

module.exports = { getUsers }