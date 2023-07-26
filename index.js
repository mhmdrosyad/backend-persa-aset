const express = require('express')
const graphqlMiddleware = require('./api/graphql')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const MONGO_URL = process.env.MONGO_CONNECTION_STRING;

mongoose.connect(MONGO_URL).then(() => {console.log('MongoDB Connected...')}).catch(err => console.error(err))

const app = express()
const PORT = process.env.PORT || 3000;

app.use(cors())
app.use('/api/graphql', graphqlMiddleware)
app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));



