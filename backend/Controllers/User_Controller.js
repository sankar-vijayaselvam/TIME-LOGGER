const User = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "supersecret";

// User Login
module.exports.UserLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        let user;
        // Determine if input is an email or a phone number
        if (isNaN(email)) {
            user = await User.findOne({ email: email });
        } else {
            user = await User.findOne({ phone: email });
        }

        if (!user) {
            return res.status(404).json({ status: "error", error: "User Not Found" });
        }

        const valid = await bcrypt.compare(password, user.password);
        if (valid) {
            const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: "1h" });
            return res.json({ status: "ok", role: user.role, email: user.email, token: token });
        } else {
            return res.status(400).json({ status: "error", error: "Invalid Password" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", error: "Internal Server Error" });
    }
};
// User Register
module.exports.UserSignUp = async (req, res) => {
    const { email, phone, password } = req.body;
    const role = "user";
    console.log(req.body);

    try {
        const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
        if (existingUser) {
            return res.status(400).json({ status: "error", message: "User already exists with this email or phone" });
        }

        const hashedPassword = await bcrypt.hash(password, 13);
        const newUser = new User({ email, phone, password: hashedPassword, role });

        await newUser.save();
        return res.json({ status: "ok", message: "User registered successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: "error", message: "An error occurred during registration" });
    }
};
