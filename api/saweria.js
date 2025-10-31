// /api/saweria.js
let lastDonation = null;

export default async function handler(req, res) {
  console.log("🛰️ Request masuk:", req.method);

  if (req.method === "POST") {
    const donation = req.body || req.query;
    console.log("🎉 Donasi masuk dari Saweria:", donation);
    lastDonation = donation;
    return res.status(200).json({ success: true });
  }

  if (req.method === "GET") {
    if (!lastDonation) {
      console.log("ℹ️ Belum ada donasi disimpan.");
      return res.status(200).json({ empty: true });
    }
    console.log("📦 Mengirim data terakhir ke Roblox:", lastDonation);
    return res.status(200).json(lastDonation);
  }

  console.warn("🚫 Method tidak diizinkan:", req.method);
  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).json({ message: "Method not allowed" });
}
