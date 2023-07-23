const UserModel = require('./model/UserModel');
const bcrypt = require('bcrypt');
const { generateToken, verifyToken } = require('./auth');

const userResolver = {
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

module.exports = userResolver;