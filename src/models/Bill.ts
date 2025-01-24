import mongoose from 'mongoose';
const condb = require('../utils/condb')
import Bill_info from './Bill_info';
const BillSchema = new mongoose.Schema({
    bill_id: {
        type: String,
        required: true
    },
    bill_user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    bill_customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
    },
    bill_date_string:{
        type: String,
    },
    bill_date: {
        type: Date,
        require: true
    },
    bill_type: {
        type: Number,
        default: 0
    },
    bill_total_thb: {
        type: Number,
        default: 0
    },
    bill_total_lak: {
        type: Number,
        default: 0
    },
    bill_status: {
        type: String,
        default: "normal"
    },
    bill_exchange_rate: {
        type: Number,
        default: 0
    },
    bill_total_point: {
        type: Number,
        default: 0
    },
    bill_item: {
    },
    bill_money: {
        type: Number,
        default: 0
    },
    bill_change: {
        type: Number,
        default: 0
    },
    user_cancelBill: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

const Bill = condb.model("Bill", BillSchema);
export default Bill;