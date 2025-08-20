import { genkit } from "genkit";
import { googleAI } from "@genkit-ai/googleai";
import dotenv from "dotenv";
dotenv.config();
export const ai = genkit({
  plugins: [googleAI({ apiKey: process.env.googelapikey })],
  model: googleAI.model(process.env.geminimodelname || "", {
    temperature: 0,
  }),
});
