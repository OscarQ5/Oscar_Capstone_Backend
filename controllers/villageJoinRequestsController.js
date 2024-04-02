const express = require("express")
const villageJoinRequests = express.Router({ mergeParams: true })
const { authenticateToken } = require("../auth/auth")
const { createJoinRequest, getAllRequests, adminRequests } = require("../queries/villageJoinRequests")

villageJoinRequests.use(authenticateToken)

villageJoinRequests.post("/", async (req, res) => {
    try {
        const { user_id, village_id } = req.body
        const newRequest = await createJoinRequest(user_id, village_id)
        res.status(200).json(newRequest);
    } catch (err) {
        res.status(500).json({ error: err });
    }
})

villageJoinRequests.get("/", async (req,res) => {
    try {
        const joinRequests = await getAllRequests();
        res.status(200).json(joinRequests);
      } catch (err) {
        res.status(404).json({ error: err });
      }
})

villageJoinRequests.get("/:village_id", async (req,res) => {
    try {
        const { village_id } = req.params
        const requests = await adminRequests(village_id)
        res.status(200).json(requests)
    } catch (err) {
        res.status(404).json({ error: err})
    }
})

module.exports = villageJoinRequests