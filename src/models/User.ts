import mongoose from 'mongoose';
const condb = require('../utils/condb')

const UserSchema =  new mongoose.Schema({
    user_name: {
        type: String,
        required: true
    },
    user_address: {
        type: String
    },
    user_phone: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    user_role: {
        type: String,
        required: true
    }
}, { timestamps: true });

const User = condb.model("User", UserSchema);
export default User;