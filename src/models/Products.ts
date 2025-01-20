import mongoose, { Schema } from 'mongoose';
const condb = require('../utils/condb')
const ProductSchema: Schema = new mongoose.Schema({
    product_id: {
        type: String,
        unique: true,
        required: true
    },
    product_name: {
        type: String,
        required: true
    },
    product_size: {
        type: String,
    },
    product_qty: {
        type: Number,
        default: 0,
    },
    product_category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        require: true
    },
    product_unit: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Unit',
        require: true
    },
    product_price_buy_THB: {
        type: Number,
        default: 0,
        require: true
    },
    product_price_sale1_THB: {
        type: Number,
        default: 0,
        require: true
    },
    product_price_sale2_THB: {
        type: Number,
        default: 0,
        require: true
    },
    product_price_buy_LAK: {
        type: Number,
        default: 0,
        require: true
    },
    product_price_sale1_LAK: {
        type: Number,
        default: 0,
        require: true
    },
    product_price_sale2_LAK: {
        type: Number,
        default: 0,
        require: true
    },
    product_point: {
        type: Number,
        default: 0,
        require: true
    },
    product_discount: {
        type: Number,
        default: 0,
        require: true
    },
    product_exp: {
        type: Date,
    },
    product_mfd: {
        type: Date,
    },
    product_address: {
        type: String,
    }
}, { timestamps: true });

const Product = condb.model("Product", ProductSchema);
export default Product;