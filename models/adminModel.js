const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String
    },
    mobile_number: {
        type: String,
        required: true,
        unique: true
    },
    profile_image: {
        type: String
    },
    isActive: {
        type: Boolean,
        default: true
    },
    role: {
        type: String,
        default: "admin"
    }
}, {
    versionKey: false,
    timestamps: true
});

const Admin = mongoose.model("admins", adminSchema);

module.exports = {
    Admin
}