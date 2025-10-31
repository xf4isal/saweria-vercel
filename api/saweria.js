let lastDonation = null; // simpan donasi terakhir di memori

export default async function handler(req, res) {
  // kalau Saweria kirim POST
  if (req.method === "POST") {
    try {
      const data = req.body;
      console.log("🎉 Donasi dari Saweria:", data);
      lastDonation = data; // simpan data

      return res.status(200).json({ success: true });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  // kalau Roblox minta data GET
  if (req.method === "GET") {
    if (lastDonation) {
      return res.status(200).json(lastDonation);
    } else {
      return res.status(200).json({ message: "Belum ada donasi masuk" });
    }
  }

  return res.status(405).json({ message: "Only GET and POST allowed" });
}
