const Product = require("../Models/Product");
const multer = require("multer");
const path = require("path");

// Configure multer for image upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Specify the directory to store the uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Add a unique timestamp to the file name
    }
});

const upload = multer({ storage: storage });

// Add Products with image upload
module.exports.AddProducts = async (req, res) => {
    const uploadImages = upload.array('images', 5); // Limit to 5 images

    uploadImages(req, res, async function (err) {
        if (err) {
            return res.status(500).send({ message: "Error uploading images", error: err.message });
        }

        const { name, discription, amount, brand, category, rating } = req.body;
        const imagePaths = req.files.map(file => ({ imageUrl: `/uploads/${file.filename}` }));

        try {
            const checkproductname = await Product.findOne({ name });
            if (!checkproductname) {
                await Product.create({
                    name,
                    discription,
                    amount,
                    brand,
                    images: imagePaths,
                    category,
                    rating
                });
                return res.send({ status: "ok" });
            } else {
                return res.send({ status: "error", message: "Product already exists" });
            }
        } catch (error) {
            return res.status(500).send({ status: "error", message: "Server error" });
        }
    });
};
module.exports.FetchProducts=async(req,res)=>{
    const {_id}=req.body;
    try{
        const data=await Product.findOne({_id:_id})
        return res.send({status:"ok",data:data})
    }
    catch(error){
        console.log(error);
        
    }
}

module.exports.UpdateProducts=async(req,res)=>{
    const{_id,name,discription,amount,brand,image,category}=req.body;
    if(!_id){
        return res.status(400).send({status:"error",message:"Invalid id or missing id"})
    }
    try{
        const updateddata=await Product.updateOne(
            {_id:_id},
            { $set :{name:name , discription:discription ,amount:amount, brand:brand,image:image,category:category}}
        );
        return res.send({status :"ok",updateddata})
    }
    catch(error){
        console.log(error);
        return res.status(500).send({status:"error",message:"invalid server error"})
        
    }
}

module.exports.DeleteProducts = async (req, res) => {
    const { _id } = req.body;
    if (!_id) {
        return res.status(400).send({ status: "error", message: "Invalid id or missing id" });
    }
    try {
        const data = await Product.deleteOne({ _id: _id });
        if (data.deletedCount === 1) {
            return res.send({ status: "ok", data: data });
        } else {
            return res.send({ status: "Failed", message: "File not found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ status: "error", message: "Error occurred while deleting product" });
    }
};



