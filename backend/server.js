const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const axios = require("axios");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

let attempts = {};

// ---------------- THREAT ENGINE ----------------
function detect(ip) {

    if (!attempts[ip]) attempts[ip] = 0;
    attempts[ip]++;

    if (attempts[ip] > 6) return "FORCE LOGIN ATTACK 🚨";
    if (attempts[ip] > 3) return "SUSPICIOUS LOGIN ⚠";

    return "SAFE";
}

// ---------------- IP INFO ----------------
async function getLocation(ip) {
    try {
        const res = await axios.get(`http://ip-api.com/json/${ip}`);
        return `${res.data.city}, ${res.data.country}`;
    } catch {
        return "Unknown";
    }
}

// ---------------- LOGIN API ----------------
app.post("/login", async (req, res) => {

    const { username, ip } = req.body;

    const location = await getLocation(ip);
    const threat = detect(ip);

    const log = {
        username,
        ip,
        location,
        threat,
        time: new Date().toLocaleString()
    };

    io.emit("new-login", log);

    res.json({ status: "ok" });
});

// ---------------- SOCKET ----------------
io.on("connection", () => {
    console.log("Dashboard connected");
});

// ---------------- START ----------------
server.listen(3000, () => {
    console.log("Running on http://localhost:3000");
});