import { z } from "genkit";
import { ai } from "../config/aiconfig.js";
import { flowRegistry } from "../registry/flowregistry.js";

export const DispatcherFlow = ai.defineFlow(
  {
    name: "DispatcherFlow",
    inputSchema: z.object({
      prompt: z.string().describe("User's math request in natural language"),
    }),
    outputSchema: z.object({
      result: z.number(),
    }),
  },
  async (input) => {
    const { output } = await ai.generate({
      prompt: `User asked: "${input.prompt}". 
        Decide if it's addition, subtraction, multiplication or division. 
        Extract numbers a and b. Return operation, a, b.`,
      output: {
        schema: z.object({
          operation: z.enum([
            "addition",
            "subtraction",
            "multiplication",
            "division",
          ]),
          a: z.number(),
          b: z.number(),
        }),
      },
    });

    if (!flowRegistry[output.operation]) {
      throw new Error(`Unsupported operation: ${output.operation}`);
    }

    return await flowRegistry[output.operation]({ a: output.a, b: output.b });
  }
);
