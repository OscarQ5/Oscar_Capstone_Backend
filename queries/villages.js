const db = require('../db/dbConfig')

const generateVillageCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let code = ''
    for (let i = 0; i < 6; i++) {
        code += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return code
}

const createVillage = async (village_name, creator_id) => {
    try {
        const village_code = generateVillageCode()
        const village = await db.one("INSERT INTO villages (village_name, village_code, creator_id) VALUES ($1, $2, $3) RETURNING *",
            [village_name, village_code, creator_id])
        return village
    } catch (err) {
        return err
    }
}

const getVillage = async (village_id) => {
    try {
        const village = await db.oneOrNone('SELECT * FROM villages WHERE village_id=$1', village_id)
        return village
    } catch (err) {
        return err
    }
}

const getVillages = async (user_id) => {
    try {
        const villages = await db.any('SELECT * FROM villages WHERE creator_id=$1', user_id)
        return villages
    } catch (err) {
        return err
    }
}

const updateVillage = async (village_id, village_name) => {
    try {
        await db.none('UPDATE villages SET village_name=$1 WHERE village_id=$2', [village_name, village_id])
    } catch (err) {
        return err
    }
}

const deleteVillage = async (village_id) => {
    try {
        await db.none('DELETE FROM villages WHERE village_id=$1', village_id);
    } catch (err) {
        return err;
    }
}

module.exports = { createVillage, getVillage, updateVillage, deleteVillage, getVillages }