export const config = {
  api: {
    bodyParser: true,
  },
};

let latestDonation = null;

export default async function handler(req, res) {
  if (req.method === "POST") {
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
    return res.status(200).json({ latestDonation });
  } 
  else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
