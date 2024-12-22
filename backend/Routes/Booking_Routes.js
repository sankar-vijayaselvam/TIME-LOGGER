const express=require("express")
const router=express.Router();
const { AddBooking }=require("../Controllers/Booking_Controller");

router.post('/addbooking',AddBooking)
module.exports=router;