const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    locationDetails: { type: String, required: true },
    landmark: { type: String },
    pincode: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    defaultAddress: { type: Boolean, default: false },
});

module.exports = mongoose.model("Address", AddressSchema);


