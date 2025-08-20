import { z } from "genkit";
import { ai } from "../config/aiconfig.js";

export const AdditionFlow = ai.defineFlow(
  {
    name: "addition",
    inputSchema: z.object({ a: z.number(), b: z.number() }),
    outputSchema: z.object({ result: z.number() }),
  },
  async ({ a, b }) => {
    return { result: a + b };
  }
);
export const SubtractionFlow = ai.defineFlow(
  {
    name: "subtraction",
    inputSchema: z.object({ a: z.number(), b: z.number() }),
    outputSchema: z.object({ result: z.number() }),
  },
  async ({ a, b }) => {
    return { result: a - b };
  }
);
export const MultiplicationFlow = ai.defineFlow(
  {
    name: "multiplication",
    inputSchema: z.object({ a: z.number(), b: z.number() }),
    outputSchema: z.object({ result: z.number() }),
  },
  async ({ a, b }) => {
    return { result: a * b };
  }
);
export const 
execute_retrieve_query = ai.defineFlow(
  {
    name: "execute_retrieve_query",
    inputSchema: z.object({ a: z.string()}),
    outputSchema: z.object({ result: z.string() }),
  },
  async ({ a}) => {
    return { result: a };
  }
);