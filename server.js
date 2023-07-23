const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');

const connectMongo = require('./utils/dbconnect');
const { asetGql, userGql } = require('./handler');

// db connection
connectMongo().then(() => console.log('MongoDB Connected...')).catch(err => console.log(err));

// express js
const app = express();


app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.use('/api', asetGql);
app.use('/user', userGql);

app.listen(5000, () => {
    console.log("Server listening on port: 5000")
});

console.log('Running a GraphQL API server at http://localhost:5000/api');