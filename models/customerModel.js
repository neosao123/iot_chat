const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
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
        type: String,
    },
    profile_image: {
        type: String,
    },
    isActive: {
        type: Boolean,
        default: true
    },
    role: {
        type: String,
        default: "customer"
    },
    initialPassChange: {
        type: Boolean,
        default: false
    },
    pin_code: {
        type: String,
        required: true
    },
    mobile_number: {
        type: String,
        required: true
    },
    address1: {
        type: String,
        required: true
    },
    address2: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    }
});

const Customer = mongoose.model("customers", customerSchema);

module.exports = {
    Customer
};