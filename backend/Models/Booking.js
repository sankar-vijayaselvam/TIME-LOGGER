const mongoose =require("mongoose")
const BookingDetailsSchema=new mongoose.Schema({
    bname:{
        type:String,
        required:true
    },
    baddress:{
        type:String,
        required:true
    },
    bdistrict:{
        type:String,
        required:true
    },
    bpincode:{
        type:String,
        required:true
    },
    bphone:{
        type:String,
        required:true
    }
},{collection:"BookingInfo",});
const Booking=mongoose.model("BookingInfo",BookingDetailsSchema);
module.exports=Booking;