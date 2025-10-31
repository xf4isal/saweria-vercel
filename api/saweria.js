export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST allowed" });
  }

  try {
    const data = req.body;
    console.log("🎉 Donasi dari Saweria:", data);

    // URL ke server Roblox kamu
    const robloxServer = "https://your-roblox-server-url.com"; // GANTI ke server kamu

    await fetch(robloxServer, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    res.status(200).json({ message: "✅ Donasi diterima & dikirim ke Roblox!" });
  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({ message: "Terjadi kesalahan server." });
  }
}
