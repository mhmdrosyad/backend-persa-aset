const { buildSchema } = require('graphql');

const schema = buildSchema(`
    type Aset {
        id: ID!,
        slug: String!,
        nama: String!,
        urlImg: String!,
        stock: Int!,
        note: String!,
        price: String!
    }

    input InsertAset {
        slug: String!,
        nama: String!,
        urlImg: String!,
        stock: Int!,
        note: String!,
        price: String!
    }

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

    type Rent {
        id: ID!,
        nama: String!,
        identitas: String!,
        nomor: String!,
        alamat: String!,
        wa: String!,
        aset: String!,
        jumlah: Int!,
        keperluan: String!,
        kenalan: String!,
        tglPinjam: String!,
        tglKembali: String!,
        note: String!,
        done: Boolean!
    }

    input NewRent {
        nama: String!,
        identitas: String!,
        nomor: String!,
        alamat: String!,
        wa: String!,
        aset: String!,
        jumlah: Int!,
        keperluan: String!,
        kenalan: String!,
        tglPinjam: String!,
        tglKembali: String!,
        note: String!,
        done: Boolean!
    }

    type Query {
        getAsets: [Aset!]!
        getAset(slug: String!): Aset
        getRents: [Rent!]!
        getRent(id: ID!): Rent
        getUsers: [User!]!
        getUser(id: ID!): User
    }

    type Mutation {
        insertAset(input: InsertAset): Aset
        updateAset(id: ID!, input: InsertAset): Aset
        deleteAset(id: ID!): ID!
        newRent(input: NewRent): Rent
        resolved(id: ID!): Rent
        register(input: NewUser): User
        login(username: String!, password: String!): AuthPayLoad!
        checkToken(token: String!): Boolean!
    }
`);

module.exports = schema;