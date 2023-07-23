const { buildSchema } = require('graphql');

const userSchema = buildSchema(`
    type User {
        id: ID!,
        username: String!,
        email: String!,
        password: String!,
    }

    type AuthPayLoad {
        token: String!,
        user: User!
    }

    input NewUser {
        username: String!,
        email: String!,
        password: String!,
    }

    type Query {
        getUsers: [User!]!
        getUser(id: ID!): User
    }

    type Mutation {
        register(input: NewUser): User
        login(username: String!, password: String!): AuthPayLoad!
        checkToken(token: String!): Boolean!
    }
`);

module.exports = userSchema;