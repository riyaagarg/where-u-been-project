import { generateFunFact } from "../services/ai-service.js";

export const funFactHandler = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "name required" });
    const fact = await generateFunFact(name);
    res.status(200).json({ fact });
  } catch (err) {
    console.error("Fun fact error:", err);
    res.status(500).json({ message: "Failed to generate fun fact" });
  }
};