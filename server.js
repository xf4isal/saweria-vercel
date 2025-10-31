// index.js
const express = require("express");
const app = express();
app.use(express.json());

// Simpan donatur di memori sementara
let donors = [];

// Webhook endpoint dari Saweria
app.post("/saweria", (req, res) => {
  try {
    const payload = req.body.data;
    const name = payload.donator_name || "Anonim";
    const amount = parseInt(payload.amount || 0);

    // Kalau donatur sudah pernah donasi, tambahkan jumlahnya
    const existing = donors.find(d => d.name === name);
    if (existing) existing.amount += amount;
    else donors.push({ name, amount });

    // Urutkan dari yang tertinggi
    donors.sort((a, b) => b.amount - a.amount);

    console.log(`💸 Donasi dari ${name}: Rp${amount}`);
    res.sendStatus(200);
  } catch (e) {
    console.error("Error:", e);
    res.sendStatus(400);
  }
});

// Endpoint untuk Roblox ambil data leaderboard
app.get("/leaderboard", (req, res) => {
  res.json(donors);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server jalan di port ${PORT}`));
