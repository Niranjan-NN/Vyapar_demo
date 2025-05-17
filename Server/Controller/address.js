const express = require('express')
const Address = require('../Model/Address')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser'); 
dotenv.config()
const sendMail = require('../Middleware/sendMail')

const addAddress = async (req, res) => {
    try {
        const newAddress = new Address(req.body);
        await newAddress.save();
        res.status(201).json({ message: "Address added successfully", address: newAddress });
    } catch (error) {
        res.status(500).json({ error: "Failed to add address" });
    }
}

const getAddress = async (req, res) => {
    try {
        const addresses = await Address.find();
        res.status(200).json(addresses);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch addresses" });
    }
}

const getByIdAddress = async (req, res) => {
    try {
        const address = await Address.findById(req.params._id);
        if (!address) return res.status(404).json({ error: "Address not found" });
        res.status(200).json(address);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch address" });
    }
}

const putAddress = async (req, res) => {
    try {
        const updatedAddress = await Address.findByIdAndUpdate(req.params._id, req.body, { new: true });
        if (!updatedAddress) return res.status(404).json({ error: "Address not found" });
        res.status(200).json({ message: "Address updated successfully", address: updatedAddress });
    } catch (error) {
        res.status(500).json({ error: "Failed to update address" });
    }
}

const deleteAddress = async (req, res) => {
    try {
        const deletedAddress = await Address.findByIdAndDelete(req.params._id);
        if (!deletedAddress) return res.status(404).json({ error: "Address not found" });
        res.status(200).json({ message: "Address deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete address" });
    }
}

module.exports = {addAddress,getAddress,getByIdAddress,putAddress,deleteAddress}
