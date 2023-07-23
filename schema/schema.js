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
    }

    type Mutation {
        insertAset(input: InsertAset): Aset
        updateAset(id: ID!, input: InsertAset): Aset
        deleteAset(id: ID!): ID!
        newRent(input: NewRent): Rent
        resolved(id: ID!): Rent
    }
`);

module.exports = schema;