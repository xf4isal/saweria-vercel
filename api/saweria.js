// /api/saweria.js
let lastDonation = null;

export default async function handler(req, res) {
  if (req.method === "POST") {
    // Saweria mengirim donasi baru
    const donation = req.body || req.query;
    console.log("🎉 Donasi masuk dari Saweria:", donation);
    lastDonation = donation;
    return res.status(200).json({ success: true });
  }

  if (req.method === "GET") {
    // Roblox cek donasi terbaru
    if (!lastDonation) return res.status(200).json({ empty: true });
    return res.status(200).json(lastDonation);
  }

  return res.status(405).send("Method not allowed");
}
