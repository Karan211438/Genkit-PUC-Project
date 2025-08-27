import express from "express";
import { DispatcherFlow } from "../chatflows/dispatcherflow.js";
const router = express.Router();
router.post("/chat", async (req, res) => {
  try {
    const input = req.body;
    const result = await DispatcherFlow(input);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: String(error) });
  }
});

export default router;
