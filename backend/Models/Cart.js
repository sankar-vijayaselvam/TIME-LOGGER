const mongoose = require("mongoose");

const CartDetailSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    totalAmount: {
      type: Number
  }
}, { collection: "CartInfo" });
const Cart = mongoose.model("CartInfo", CartDetailSchema);
module.exports = Cart;