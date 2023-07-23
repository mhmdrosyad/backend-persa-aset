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

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server listening on port: ${port}`)
});

console.log(`Running a GraphQL API server at http://localhost:${port}/api`);