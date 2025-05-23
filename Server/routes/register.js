const express = require('express')
const router = express.Router()
const {registerForm, otpVerify, login, forgotPassword, verifyOtp, resetPassword} = require('../Controller/register')
const {addAddress,getAddress,getByIdAddress,putAddress,deleteAddress} = require('../Controller/address')
const {adminRegister, Adminlogin} = require('../Controller/Auth')
const {authenticateJWT, authorizeRoles} = require('../Middleware/Authorization')
const Register = require('../Model/register')
router.post('/user',registerForm)
router.post('/verifyUser',otpVerify)
router.post('/login',login)
router.post('/forgotPassword',forgotPassword)
router.post('/verifyOtp',verifyOtp)
router.post('/resetPassword',resetPassword)


router.post('/addAddress',addAddress)
router.get('/getAddress',getAddress)
router.get('/getByIdAddress/:_id',getByIdAddress)
router.put('/putAddress/:_id',putAddress)
router.delete('/deleteAddress/:_id',deleteAddress)

router.post('/adminRegister',adminRegister)
router.post('/adminLogin',Adminlogin)

router.put("/promote/:_id", authenticateJWT, authorizeRoles("admin"), async (req, res) => {
    const { _id } = req.params;
  
    try {
      const user = await Register.findById(_id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      user.role = "admin"; // ✅ Update role field
      await user.save();
  
      res.json({ message: "User promoted to admin" });
    } catch (error) {
      res.status(500).json({ message: "Error promoting user" });
    }
  });

//   router.get("/dashboard", authenticateJWT, authorizeRoles("admin"), (req, res) => {
//     res.json({ message: "Welcome to the Admin Dashboard!" });
//   });
 
module.exports = router;