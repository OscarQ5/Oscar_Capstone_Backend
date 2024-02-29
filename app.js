const express = require('express')
const cors = require('cors')
const app = express()
const path = require('path')

app.use(cors())
app.use(express.json())
app.use('/static', express.static(path.join(__dirname, "public")))

app.get('/', (req, res) => {
    res.json({ index: "This is the index page" })
})

module.exports = app