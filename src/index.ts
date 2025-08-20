import express from "express";
import mathRouter from "./routes/routes.maths.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(express.json());
app.use("/", mathRouter);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
