export default function handler(req, res) {
  res.status(200).json({ 
    message: "API Working!", 
    timestamp: new Date().toISOString(),
    method: req.method
  });
}
