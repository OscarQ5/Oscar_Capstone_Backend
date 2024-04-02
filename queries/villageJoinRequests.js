const db = require("../db/dbConfig");

const createJoinRequest = async (user_id, village_id) => {
    try {
        const joinRequest = await db.one(
            "INSERT INTO village_join_requests (user_id, village_id) VALUES ($1, $2) RETURNING *",
            [user_id, village_id]
        );
        return joinRequest;
    } catch (err) {
        return err;
    }
};

const getAllRequests = async () => {
    try {
        const allRequests = await db.any("SELECT * FROM village_join_requests")
        return allRequests
    } catch (err) {
        return err
    }
}

const adminRequests = async (village_id) => {
    try {
        const requests = await db.any("SELECT * FROM village_join_requests WHERE village_id=$1 AND is_accepted=false", village_id)
        return requests
    } catch (err) {
        return err
    }
}

module.exports = { createJoinRequest, getAllRequests, adminRequests }