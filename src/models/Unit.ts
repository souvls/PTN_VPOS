import mongoose from 'mongoose';
const condb = require('../utils/condb')

const UnitSchema =  new mongoose.Schema({
    unit_name: {
        type: String,
        required: true
    },
}, { timestamps: true });

const Unit = condb.model("Unit", UnitSchema);
export default Unit;