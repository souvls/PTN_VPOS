import mongoose from 'mongoose';
const condb = require('../utils/condb')

const ExchangeSchema = new mongoose.Schema({
    exchange_rate: {
        type: Number,
        required: true
    },
}, { timestamps: true });

const Exchange = condb.model("Exchange", ExchangeSchema);
export default Exchange;