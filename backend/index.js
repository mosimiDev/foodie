require("dotenv").config();
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Sequelize } = require('sequelize');
const { PrismaClient } = require('./app/generated/prisma');
const { withAccelerate } = require('@prisma/extension-accelerate');


const prisma = new PrismaClient().$extends(withAccelerate());
const auth = require('./middleware/authMiddleware')

module.exports = { prisma };

const app = express();
const port = process.env.PORT || 4000;
const sequelize = new Sequelize(
    process.env.DATABASE_URL,
    {
        storage: './foodie_auth.db',
        logging: false,
    }
);

sequelize
    .sync()
    .then(() => {
        console.log("connected to the database.");
    })
    .catch(() => {
        console.log("unable to connect to the database.");
    })
app.use(express.json());
// Enable URL-encoded body parsing (if needed)
app.use(express.urlencoded({ extended: true }));

const SECRET = process.env.ACCESS_SECRET;       // For access token
const REFRESH_SECRET = process.env.REFRESH_SECRET;  // For refresh token

// --- Helper: Generate Tokens ---
const generateTokens = (user) => {
    const accessToken = jwt.sign({ id: user.id, email: user.email }, SECRET, { expiresIn: "15m" });
    const refreshToken = jwt.sign({ id: user.id }, REFRESH_SECRET, { expiresIn: "7d" });
    return { accessToken, refreshToken };
};

// --- REGISTER ---
app.post("/auth/register", async (req, res) => {
    try {
        const { email, password, fullName } = req.body;
        if (!email || !password) return res.status(400).json({ message: "Email and password required" });

        const existing = await prisma.user.findUnique({ where: { email } });
        if (existing) return res.status(400).json({ message: "User already exists" });

        const hashed = bcrypt.hashSync(password, 10);
        const user = await prisma.user.create({
            data: { email, password: hashed, fullName },
            select: { id: true, email: true }
        });

        const tokens = generateTokens(user);
        res.json({ user, ...tokens });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

// --- LOGIN ---
app.post("/auth/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ message: "Email and password required" });

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        const valid = bcrypt.compareSync(password, user.password);
        if (!valid) return res.status(400).json({ message: "Invalid credentials" });

        const tokens = generateTokens(user);
        res.json({ user: { id: user.id, email: user.email }, ...tokens });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

// --- REFRESH ---
app.post("/auth/refresh", async (req, res) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) return res.sendStatus(401);

        jwt.verify(refreshToken, REFRESH_SECRET, async (err, decoded) => {
            if (err) return res.sendStatus(403);
            const user = await prisma.user.findUnique({ where: { id: decoded.id } });
            if (!user) return res.sendStatus(403);
            const tokens = generateTokens({ id: user.id, email: user.email });
            res.json(tokens);
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

// --- ME (Profile) ---
app.get("/auth/me", auth, async (req, res) => {
    try {
        const authHeader = req.headers["authorization"];
        if (!authHeader) return res.sendStatus(401);

        const token = authHeader.split(" ")[1];
        jwt.verify(token, SECRET, async (err, decoded) => {
            if (err) return res.sendStatus(403);
            const user = await prisma.user.findUnique({ where: { id: decoded.id }, select: { id: true, email: true, fullName: true } });
            if (!user) return res.sendStatus(404);
            res.json(user);
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

app.listen(4000, () => console.log(`Auth API running on http://localhost:${port}`));

