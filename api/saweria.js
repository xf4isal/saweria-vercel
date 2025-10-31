// /api/saweria.js
let lastDonation = null;
let donations = [];

export default async function handler(req, res) {
  console.log(`📩 Request ${req.method} diterima`);

  if (req.method === "POST") {
    const body = req.body || {};
    console.log("🎉 Donasi diterima dari Saweria:", body);

    lastDonation = {
      id: body.id || Date.now().toString(),
      name: body.donator_name || "Anonymous",
      amount: body.amount_raw || 0,
      message: body.message || "",
      timestamp: new Date().toISOString(),
    };

    donations.push(lastDonation);
    if (donations.length > 100) donations.shift();

    return res.status(200).json({ success: true });
  }

  if (req.method === "GET") {
    return res.status(200).json({
      status: "ok",
      total: donations.length,
      lastDonation,
      donations,
    });
  }

  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).json({ message: "Method not allowed" });
}
