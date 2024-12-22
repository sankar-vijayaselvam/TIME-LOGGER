const express=require("express")
const router=express.Router();
const{ AddProducts, FetchProducts, UpdateProducts, DeleteProducts }=require("../Controllers/Product_Controller");


router.post('/addproduct',AddProducts)
router.get('/fetchproduct',FetchProducts)
router.put('/updateproduct',UpdateProducts)
router.delete('/deleteproduct',DeleteProducts)

module.exports=router;