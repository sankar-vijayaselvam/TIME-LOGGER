const express =require("express")
const app = express();
app.use(express.json())

app.use('/uploads', express.static('uploads'));

const mongoose=require("mongoose")

const cors=require("cors")
app.use(cors()); 

const mongoDburl="mongodb://localhost:27017/SkyTrends"
mongoose.connect(mongoDburl)
.then(()=>{
    console.log("Connected to database")
})
.catch((e)=>{
    console.log(e);
})

app.listen(5000,()=> console.log("Server Started"));

const userRoutes=require('./Routes/User_Routes');
const productRoutes =require('./Routes/Product_Routes')
const cartRoutes=require('./Routes/Cart_Routes')
const bookingRoutes=require('./Routes/Booking_Routes');


app.use('/users',userRoutes);
app.use('/product',productRoutes)
app.use('/cart',cartRoutes)
app.use('/booking',bookingRoutes)


const {authenticateToken }=require('./Middleware/jwt')

app.get('/protected-route',authenticateToken,(req,res)=>{
    res.send('This is a protected route');
});