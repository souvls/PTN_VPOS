import mongoose from 'mongoose';
const condb = require('../utils/condb')

const CustomerSchema = new mongoose.Schema({
    customer_id: {
        type: String,
        required: true
    },
    customer_name: {
        type: String,
        required: true
    },
    customer_phone: {
        type: String,
        required: true,
        unique: true,
    },
    customer_address: {
        type: String,
        required: true
    },
    customer_point: {
        type: Number,
        required: true
    }
}, { timestamps: true });

const Customer = condb.model("Customer", CustomerSchema);
export default Customer;