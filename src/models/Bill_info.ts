import mongoose from 'mongoose';
const condb = require('../utils/condb')
const Bill_infoSchema = new mongoose.Schema({
    bill_id: {
        type: String,
        required: true
    },
    bill_product_id: {
        type: String,
        required: true
    },
    bill_product_name: {
        type: String,
        required: true
    },
    bill_product_size: {
        type: String,
    },
    bill_product_qty: {
        type: Number,
        default: 0,
    },
    bill_product_category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        require: true
    },
    bill_product_unit: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Unit',
        require: true
    },
    bill_product_price_buy_THB: {
        type: Number,
        default: 0,
    },
    bill_product_price_sale1_THB: {
        type: Number,
        default: 0,
    },
    bill_product_price_sale2_THB: {
        type: Number,
        default: 0,
    },
    bill_product_price_buy_LAK: {
        type: Number,
        default: 0,
    },
    bill_product_price_sale1_LAK: {
        type: Number,
        default: 0,
    },
    bill_product_price_sale2_LAK: {
        type: Number,
        default: 0,
    },
    bill_product_point: {
        type: Number,
        default: 0,
    },
    bill_product_discount: {
        type: Number,
        default: 0,
    },
    bill_info_count_thb: {
        type: Number,
        default: 0,
    },
    bill_info_total_thb: {
        type: Number,
        default: 0,
    },
    bill_info_count_lak: {
        type: Number,
        default: 0,
    },
    bill_info_total_lak: {
        type: Number,
        default: 0,
    },
    bill_info_total_point: {
        type: Number,
        default: 0,
    }
}, { timestamps: true });

const Bill_info = condb.model("Bill_info", Bill_infoSchema);
export default Bill_info;