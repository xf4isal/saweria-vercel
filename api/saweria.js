// /api/saweria.js
let donations = []; // simpan banyak donasi, bukan cuma satu

export default async function handler(req, res) {
  console.log("🛰️ Request masuk:", req.method);

  if (req.method === "POST") {
    const donation = req.body || req.query;
    console.log("🎉 Donasi masuk dari Saweria:", donation);

    donations.push({
      id: donation.id || Date.now().toString(),
      name: donation.donator_name || "Anonymous",
      amount: donation.amount_raw || 0,
      time: new Date().toISOString(),
    });

    // Batasi maksimal 100 donasi biar gak overload
    if (donations.length > 100) donations.shift();

    return res.status(200).json({ success: true, total: donations.length });
  }

  if (req.method === "GET") {
    // Roblox ambil daftar donasi
    return res.status(200).json({
      count: donations.length,
      donations,
    });
  }

  // Kalau bukan GET/POST
  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).json({ message: "Method not allowed" });
}
