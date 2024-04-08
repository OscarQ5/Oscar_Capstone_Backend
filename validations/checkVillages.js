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

const checkAdminStatus = async (req, res, next) => {
    const { user_id } = req.user
    const village_id = req.params.id || req.query.village_id
    try {
        const village = await db.oneOrNone("SELECT * FROM villages WHERE village_id=$1", village_id)

        if (!village) {
            return res.status(404).json({ error: "Village not found" })
        }

        if (village.creator_id !== user_id) {
            return res.status(403).json({ error: "Only admins can perform this action" })
        }

        next()
    } catch (err) {
        console.error("Error checking admin status:", err)
        return res.status(500).json({ error: "Internal Server Error" })
    }
}

module.exports = { checkDuplicateVillage, checkAdminStatus }