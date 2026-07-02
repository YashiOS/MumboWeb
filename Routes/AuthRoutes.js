const express = require("express");
const router = express.Router();
const User = require("../Model/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "mumzo_karan_lucifer";

router.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already exists"
            });
        }

        const lastUser = await User.findOne().sort({ createdAt: -1 });

        let userId = "MUMZ001";

        if (lastUser && lastUser.userId) {
            const lastNumber = parseInt(lastUser.userId.replace("MUMZ", ""));
            const nextNumber = lastNumber + 1;

            userId = `MUMZ${String(nextNumber).padStart(3, "0")}`;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            userId,
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            success: true,
            message: "Signup Successful",
            userId: user.userId
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
});

router.post("/login", async (req, res) => {
    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid password"
            });
        }

        const token = jwt.sign(
            {
                userId: user.userId
            },
            JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        res.status(200).json({
            success: true,
            message: "Login Successful",
            token,
            userId: user.userId,
            name: user.name,
            email: user.email
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
});

module.exports = router;
