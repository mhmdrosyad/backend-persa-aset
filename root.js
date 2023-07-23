const AsetModel = require('./model/AsetModel');
const RentModel = require('./model/RentModel');

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
}

module.exports = root;