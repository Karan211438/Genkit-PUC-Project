import { z } from "genkit";
import { ai } from "../config/aiconfig.js";
import { flowRegistry } from "../registry/flowregistry.js";
import dotenv from "dotenv";
dotenv.config();
export const DispatcherFlowcrm = ai.defineFlow(
  {
    name: "DispatcherFlow",
    inputSchema: z.object({
      prompt: z.string().describe("User's Dynamics 365 request in natural language"),
    }),
    outputSchema: z.object({
      name: z.enum([
        "retrieve_entity_metadata",
      ]),
      partialmetadataurl: z.string().describe("The relative metadata URL starting with `/EntityDefinitions`. Only the following formats are supported:\n\n1. `/EntityDefinitions?$select=LogicalName,DisplayName,Description,MetadataId` – Fetches metadata of all entities. This is used in the first step to identify and confirm the entity mentioned by the user (e.g., 'contact').\n\n2. `/EntityDefinitions(LogicalName='<entity>')/Attributes?$select=DisplayName,LogicalName,MetadataId` – Fetches all attribute metadata for the confirmed entity. This is used in the second step to locate the attribute mentioned by the user (e.g., 'salary').\n\n❌ Do not use unsupported query options like `$filter`, `$expand`, or `contains`.\n✅ Always use `$select` to limit metadata fields and keep responses optimized.\n✅ Always wait for user confirmation after listing matched entities before fetching attribute metadata."),
      entity: z.string().describe("The display name or logical name of the entity mentioned in the user prompt. This is auto-detected from user input (e.g., in the prompt 'show me metadata of contact entity', the entity value should be 'contact')"),
      attribute: z.string().describe("The display name or logical name of the attribute mentioned in the user prompt. This is auto-detected from user input (e.g., in the prompt 'show me metadata of last name attribute of contact entity', the attribute value should be 'lastname')"),
    }),
  },
  async (input) => {
    const { output } = await ai.generate({
      system: process.env.systemmsg, 
      prompt: `User asked: "${input.prompt}".
Decide which Dynamics 365 function 
\ call and extract parameters accordingly.`,
      output: {
        schema: z.object({
          name: z.enum([
            "retrieve_entity_metadata",
            "execute_retrieve_query",
            "execute_data_operation",
          ]),
          partialmetadataurl: z.string().describe("The relative metadata URL starting with `/EntityDefinitions`. Only the following formats are supported:\n\n1. `/EntityDefinitions?$select=LogicalName,DisplayName,Description,MetadataId` – Fetches metadata of all entities. This is used in the first step to identify and confirm the entity mentioned by the user (e.g., 'contact').\n\n2. `/EntityDefinitions(LogicalName='<entity>')/Attributes?$select=DisplayName,LogicalName,MetadataId` – Fetches all attribute metadata for the confirmed entity. This is used in the second step to locate the attribute mentioned by the user (e.g., 'salary').\n\n❌ Do not use unsupported query options like `$filter`, `$expand`, or `contains`.\n✅ Always use `$select` to limit metadata fields and keep responses optimized.\n✅ Always wait for user confirmation after listing matched entities before fetching attribute metadata."),
         entity: z.string().describe("The display name or logical name of the entity mentioned in the user prompt. This is auto-detected from user input (e.g., in the prompt 'show me metadata of contact entity', the entity value should be 'contact')"),
         attribute: z.string().describe("The display name or logical name of the attribute mentioned in the user prompt. This is auto-detected from user input (e.g., in the prompt 'show me metadata of last name attribute of contact entity', the attribute value should be 'lastname')"),
        }),
      },
    });
    console.log("Output:", output.name + " " +output.partialmetadataurl + " " + output.entity + " " + output.attribute);
    if (!flowRegistry[output.name]) {
      throw new Error(`Unsupported operation: ${output.name}`);
    }
    return await flowRegistry[output.name](output.partialmetadataurl, output.entity, output.attribute);
  }
);


