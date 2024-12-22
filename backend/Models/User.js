const mongoose = require("mongoose");

const UserDetailsSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    }
}, 
{
    collection: "UserInfo" 
});

const User = mongoose.model("UserInfo", UserDetailsSchema);
module.exports = User;
