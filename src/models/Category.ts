import mongoose from 'mongoose';
const condb = require('../utils/condb')

const CategorySchema = new mongoose.Schema({
    category_name: {
        type: String,
        required: true
    },
}, { timestamps: true });

const Category = condb.model("Category", CategorySchema);
export default Category;