export default async function handler(req, res) {
  if (req.method === "POST") {
    // Data dari Saweria
    console.log("🎉 Donasi diterima:", req.body);
    global.lastDonation = req.body;
    return res.status(200).json({ message: "OK" });
  }

  if (req.method === "GET") {
    // Dipanggil dari Roblox
    return res.status(200).json(global.lastDonation || {});
  }

  return res.status(405).json({ message: "Method not allowed" });
}
