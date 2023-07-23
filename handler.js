const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const root = require('./root');
const userSchema = require('./schema/userSchema');
const userResolver = require('./userResolver');

exports.asetGql = graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
});

exports.userGql = graphqlHTTP({
    schema: userSchema,
    rootValue: userResolver,
    graphiql: true
});