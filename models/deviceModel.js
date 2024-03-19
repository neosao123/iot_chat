const mongoose = require("mongoose");
const { Customer } = require("../models/customerModel");
const { DeviceTypeModel } = require("../models/deviceTypeModel")

const deviceSchema = new mongoose.Schema({
    deviceId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: DeviceTypeModel
    },
    serialNumber: {
        type: String,
        required: true
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: Customer
    },
    status: {
        type: Boolean,
        default: true
    },
    voltage: {
        type: String,
        default: "0"
    },
    current: {
        type: String,
        default: "0"
    }
}, {
    timestamps: true,
    versionKey: false
});

const DeviceModel = mongoose.model("devices", deviceSchema);

module.exports = {
    DeviceModel
};