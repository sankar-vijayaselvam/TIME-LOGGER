const Cart = require("../Models/Cart");
const Product = require("../Models/Product");

module.exports.AddCartProducts = async (req, res) => {
    const { userId, products } = req.body;

    try {
        let cart = await Cart.findOne({ userId });

        if (cart) {
            for (const product of products) {
                const { productId, quantity } = product;
                let productInCart = cart.products.findOne(productId);
                 
                if (productInCart) {
                    productInCart.quantity += quantity;
                } else {
                    cart.products.push({ productId, quantity });
                }
            }
            cart.totalAmount = await calculateTotalAmount(cart.products);

        } else {
            cart = new Cart({
                userId,
                products,
                totalAmount: await calculateTotalAmount(products)
            });
        }
        await cart.save();
        return res.status(200).json({ message: "Cart updated successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error updating cart" });
    }
};

module.exports.RemoveProductFromCart = async (req, res) => {
    const { userId, productId } = req.body;
    try {
        let cart = await Cart.findOne({ userId });

        if (cart) {
            cart.products = cart.products.filter(product => product.productId.toString() !== productId);

            if (cart.products.length === 0) {
                await Cart.deleteOne({ userId });
            } else {
                cart.totalAmount = await calculateTotalAmount(cart.products);
                await cart.save();
            }

            return res.status(200).json({ message: "Product removed from cart" });
        } else {
            return res.status(404).json({ message: "Cart not found" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error removing product from cart", error: error.message });
    }
};

const calculateTotalAmount = async (products) => {
    let totalAmount = 0;
    for (const product of products) {
        const productDetails = await Product.findById(product.productId);
        if (productDetails) {
            totalAmount += productDetails.amount * product.quantity;
        }
    }
    return totalAmount;
};
