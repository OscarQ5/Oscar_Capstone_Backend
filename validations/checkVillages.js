const db = require("../db/dbConfig");

const checkDuplicateVillage = async (req, res, next) => {
    const { village_name } = req.body
    try {
        const existingVillage = await db.oneOrNone(
            "SELECT * FROM villages WHERE LOWER(village_name) = LOWER($1)",
            village_name
        )
        if (existingVillage) {
            return res.status(400).json({ error: "Village with the same name already exists" })
        }
        next()
    } catch (err) {
        console.error("Error checking duplicate village:", err)
        return res.status(500).json({ error: "Internal Server Error" })
    }
}

module.exports = { checkDuplicateVillage }