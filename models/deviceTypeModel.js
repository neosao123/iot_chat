const mongoose = require("mongoose");

const deviceTypeSchema = new mongoose.Schema({
    devicetype: {
        type: String,
        required: true
    }
});

const DeviceTypeModel = mongoose.model("devicetypes", deviceTypeSchema);

module.exports = {
    DeviceTypeModel
};