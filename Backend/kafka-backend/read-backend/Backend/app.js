const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors({ origin: true, credentials: true }))
app.use(express.json({ extended: false }))


app.use(express.json())

//app configurations


module.exports=app;