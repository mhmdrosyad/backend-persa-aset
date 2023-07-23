const { graphqlHTTP } = require('express-graphql');
const schema = require('../schema/schema');
const root = require('./root');

exports.apiGql = graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
});
