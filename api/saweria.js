let latestDonation = null;

export default async function handler(req, res) {
  if (req.method === "POST") {
    // Webhook dari Saweria
    const body = req.body;
    console.log("Webhook Saweria diterima:", body);

    latestDonation = {
      id: body?.data?.transactionId || Date.now().toString(),
      name: body?.data?.donor_name || "Anonim",
      amount: body?.data?.amount || 0,
      message: body?.data?.message || "",
      timestamp: new Date().toISOString(),
    };

    return res.status(200).json({ message: "Donasi diterima", latestDonation });
  } 
  else if (req.method === "GET") {
    // Endpoint yang diakses Roblox
    return res.status(200).json({ latestDonation });
  } 
  else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
