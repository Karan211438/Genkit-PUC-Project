import express from "express";
import { DispatcherFlow } from "../flows/dispatcherflow.js";
import {DispatcherFlowcrm }from "../flows/crudopreationdispatcherflow.js";

const router = express.Router();

router.post("/math", async (req, res) => {
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
