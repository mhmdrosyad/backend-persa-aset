const AsetModel = require('../model/AsetModel');
const RentModel = require('../model/RentModel');
const UserModel = require('../model/UserModel');
const bcrypt = require('bcrypt');
const { generateToken, verifyToken } = require('../utils/auth');

const root = {
    getAsets: async () => {
        try {
            const asets = await AsetModel.find();
            return asets;
        } catch (error) {
            throw new Error('Failed to fetch asets')
        }
    },
    getAset: async ({ slug }) => {
        try {
            const aset = await AsetModel.findOne({ slug: slug });
            return aset;
        } catch (error) {
            throw new Error('Failed to fetch asets')
        }
    },
    insertAset: async ({ input }) => {
        try {
            const aset = new AsetModel({ ...input });
            await aset.save();
            return aset;
        } catch (error) {
            throw new Error('Failed to insert aset');
        }
    },
    updateAset: async ({ id, input }) => {
        try {
            const updatedAset = await AsetModel.findByIdAndUpdate(id, { ...input }, { new: true });
            return updatedAset;
        } catch (error) {
            throw new Error('Failed to update aset')
        }
    },
    deleteAset: async ({ id }) => {
        try {
            await AsetModel.findByIdAndDelete(id);
            return id;
        } catch (error) {
            throw new Error('Failed to delete aset')
        }
    },
    newRent: async ({ input }) => {
        try {
            const rent = new RentModel({ ...input });
            await rent.save();
            return rent;
        } catch (error) {
            throw new Error('Failed to add new rent');
        }
    },
    getRents: async () => {
        try {
            const rents = await RentModel.find();
            return rents;
        } catch (error) {
            throw new Error('Failed to fetch asets')
        }
    },
    getRent: async ({ id }) => {
        try {
            const rent = await RentModel.findById(id);
            return rent;
        } catch (error) {
            throw new Error('Failed to fetch asets')
        }
    },
    resolved: async ({ id }) => {
        try {
            const { done } = await RentModel.findById(id);
            const isDone = done;
            const resolveRent = await RentModel.findByIdAndUpdate(id, {done: !isDone} , { new: true });
            return resolveRent;
        } catch (error) {
            throw new Error('Failed to fetch asets')
        }
    },
    getUsers: async () => {
        try {
            const users = await UserModel.find();
            return users;
        } catch (error) {
            throw new Error('Failed to fetch asets')
        }
    },
    register: async ({ input }) => {
        try {
            const { username, email, password } = { ...input };
            
            const existingUser = await UserModel.findOne({ username: username });
            const existingEmail = await UserModel.findOne({ email: email })
            
            if(!existingUser && !existingEmail) {
                const hashedPassword = await bcrypt.hash(password, 10);
                const user = new UserModel({
                    username,
                    email,
                    password: hashedPassword,
                    createdAt: new Date(Date.now()).toISOString(),
                    updatedAt: new Date(Date.now()).toISOString()
                });
    
                await user.save();
                return user;
            }
            
            throw new Error('Username atau email sudah didaftarkan');
            
        } catch (error) {
            throw new Error('Failed to register user ' + error);
        }
    },
    login: async ({ username, password }) => {
        try {
            const user = await UserModel.findOne({ username });

            if(!user) {
                throw new Error('Username tidak ditemukan');
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            
            if(!isPasswordValid) {
                throw new Error('Password salah');
            }

            const token = generateToken({ userId: user.id });
            return { token, user: { id: user.id, username: user.username, email: user.email } };
        } catch (error) {
            throw new Error(error);
        }
    },
    checkToken: async ({ token }) => {
        try {
            const cekToken = verifyToken(token);
            if(!cekToken) {
                return false;
            }
            
            return true;
        } catch (error) {
            throw new Error(error);
        }
    }
}

module.exports = root;