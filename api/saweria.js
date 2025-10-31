// /api/saweria.js
let lastDonation = null;
let donations = [];

export default async function handler(req, res) {
  console.log(`📩 Request ${req.method} diterima`);

  // Saweria kadang kirim OPTIONS sebelum POST (preflight)
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.status(200).end();
  }

  res.setHeader("Access-Control-Allow-Origin", "*");

  if (req.method === "POST") {
    try {
      const body = req.body || {};
      console.log("🎉 Donasi diterima:", body);

      lastDonation = {
        id: body.id || Date.now().toString(),
        name: body.donator_name || "Anonymous",
        amount: body.amount_raw || 0,
        message: body.message || "",
        timestamp: new Date().toISOString(),
      };

      donations.push(lastDonation);
      if (donations.length > 100) donations.shift();

      return res.status(200).json({ success: true, lastDonation });
    } catch (e) {
      console.error("❌ Error parsing POST:", e);
      return res.status(400).json({ error: "Bad request" });
    }
  }

  if (req.method === "GET") {
    return res.status(200).json({
      status: "ok",
      total: donations.length,
      lastDonation,
      donations,
    });
  }

  // Kalau bukan GET/POST/OPTIONS, tolak
  res.setHeader("Allow", ["GET", "POST", "OPTIONS"]);
  return res.status(405).json({ message: "Method not allowed" });
}
