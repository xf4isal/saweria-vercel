// api/saweria.js
export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Hanya terima GET dan POST
  if (req.method === 'GET') {
    // Endpoint untuk test koneksi
    return res.status(200).json({
      success: true,
      message: 'Saweria API is running',
      timestamp: new Date().toISOString()
    });
  }

  if (req.method === 'POST') {
    try {
      const { action, data } = req.body;

      // Handle berbagai action
      switch (action) {
        case 'webhook':
          // Terima webhook dari Saweria
          console.log('Received donation:', data);
          
          // Simpan ke database atau forward ke service lain
          // Untuk sementara kita return success
          return res.status(200).json({
            success: true,
            message: 'Donation received',
            data: data
          });

        case 'get_donations':
          // Endpoint untuk Roblox request donations
          // Di sini kamu bisa fetch dari database atau cache
          const donations = [
            {
              donator: data?.donator || 'Anonymous',
              amount: data?.amount || 0,
              message: data?.message || '',
              timestamp: new Date().toISOString()
            }
          ];

          return res.status(200).json({
            success: true,
            donations: donations
          });

        default:
          return res.status(400).json({
            success: false,
            error: 'Invalid action'
          });
      }
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  // Method tidak didukung
  return res.status(405).json({
    success: false,
    error: 'Method not allowed'
  });
}
