import { z } from "genkit";
import { ai } from "../config/aiconfig.js";
import { DispatcherInput,ChatResponseOutput, PluginFilterOutput, RetrieveEntityMetadataOutput } from "./flowschema.js";

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
export const execute_retrieve_query = ai.defineFlow(
  {
    name: "execute_retrieve_query",
    inputSchema: z.object({ a: z.string()}),
    outputSchema: z.object({ result: z.string() }),
  },
  async ({ a}) => {
    return { result: a };
  }
);
export const NormalChatFlow = ai.defineFlow(
  {
    name: "normalChatFlow",
    inputSchema: DispatcherInput,
    outputSchema: ChatResponseOutput,
  },
  async (input) => {
    const { output } = await ai.generate({
      system: process.env.normalchatsystemmsg,
      prompt: `User asked: "${input.prompt}".Respond strictly in JSON.`,
      output: { schema: ChatResponseOutput },
    });
    return output;
  }
);
export const getPluginTraceLogFilter =ai.defineFlow(
  {
    name: "getPluginTraceLogFilter",
    inputSchema: DispatcherInput,
    outputSchema: PluginFilterOutput,
  },
  async (input) => {
    const { output } = await ai.generate({
      system: process.env.systemmsgtrace, 
      prompt: `User asked: "${input.prompt}".  Extract relevant filter criteria for fetching plugin trace logs from Dynamics 365.  Return the criteria in JSON format as per the specified schema. 
        If a criterion is not mentioned, omit it from the JSON. 
        Ensure date formats are in ISO 8601 (YYYY-MM-DDTHH:MM:SSZ). 
        If no specific criteria are provided, return an empty JSON object.`,
      output: { schema: PluginFilterOutput },
    });
    console.log("Output:", output);
    return output;
  }
);
export const RetrieveEntityMetadataFlow = ai.defineFlow(
  {
    name: "retrieveEntityMetadata",
    inputSchema: DispatcherInput,
    outputSchema: RetrieveEntityMetadataOutput,
  },
  async (input) => {
    const { output } = await ai.generate({
      system: `You are an assistant that extracts Dynamics 365 metadata retrieval parameters.`,
      prompt: `User asked: "${input.prompt}". 
      Detect:
      1. Entity name or display name mentioned.
      2. Attribute name if provided.
      3. Construct correct 'partialmetadataurl' as per rules:
         - For entity metadata: "/EntityDefinitions?$select=LogicalName,DisplayName,Description,MetadataId"
         - For attribute metadata: "/EntityDefinitions(LogicalName='<entity>')/Attributes?$select=DisplayName,LogicalName,MetadataId"
      Return JSON with keys: partialmetadataurl, entity, attribute.`,
      output: {
        schema: RetrieveEntityMetadataOutput,
      },
    });
    return output;
  }
);
