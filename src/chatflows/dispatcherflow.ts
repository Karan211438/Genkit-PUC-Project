import { z } from "genkit";
import { ai } from "../config/aiconfig.js";
import { flowRegistry } from "../registry/flowregistry.js";
import { DispatcherInput, DispatcherOutput } from "./flowschema.js";
export const DispatcherFlow = ai.defineFlow(
  {
    name: "dispatcherFlow",
    inputSchema: DispatcherInput,
    outputSchema: DispatcherOutput,
  },
  async (input) => {
    const { output } = await ai.generate({
      system:process.env.dispatcherflowsystemmsg,
      prompt: `User asked: "${input.prompt}". Return the best matching flow name.`,
      output: { schema: DispatcherOutput },
    });
    console.log("Dispatched to flow:", output.flowName);
    return await flowRegistry[output.flowName](input);
  }
);

