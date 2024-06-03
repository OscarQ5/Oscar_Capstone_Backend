const db = require("../db/dbConfig");

const createJoinRequest = async (user_id, village_id) => {
    const joinRequest = await db.oneOrNone(
        "INSERT INTO village_join_requests (user_id, village_id) VALUES ($1, $2) RETURNING *",
        [user_id, village_id]
    )
    return joinRequest
};

const getAllRequests = async () => {
    const allRequests = await db.any("SELECT * FROM village_join_requests")
    return allRequests
}

const adminRequests = async (village_id) => {
    const requests = await db.any("SELECT * FROM village_join_requests WHERE village_id=$1 AND is_accepted=false", village_id)
    return requests
}

const deleteJoinRequest = async (request_id) => {
    const deletedRequest = await db.oneOrNone("DELETE FROM village_join_requests WHERE request_id=$1 RETURNING *", request_id)
    return deletedRequest
}

module.exports = { createJoinRequest, getAllRequests, adminRequests, deleteJoinRequest }