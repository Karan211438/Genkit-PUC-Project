// const ConversationSummarySchema = z.object({
//   title: z.string().describe("A short, catchy title for the conversation"),
//   followUpPrompts: z.array(z.string()).describe("List of suggested follow-up prompts"),
// });


//export const conversationSummaryFlow = ai.defineFlow(
//   {
//     name: 'entitycreation',
//     inputSchema: z.object({
//       history: z.array(z.object({
//         role: z.enum(['user', 'assistant']),
//         content: z.string()
//       })),
//       latestResponse: z.string(),
//     }),
//     outputSchema: ConversationSummarySchema,
//   },
//   async (input) => {
//     const { output } = await ai.generate({
//       system: "You are a helpful assistant that summarizes conversations.",
//       prompt: `
// Given the chat history and the latest response, create:
// 1. A short and catchy title.
// 2. 3 relevant follow-up prompts the user might ask next.

// Chat history:
// ${JSON.stringify(input.history, null, 2)}

// Latest response:
// ${input.latestResponse}
// `,
//       output: { schema: ConversationSummarySchema },
//     });

//     return output || { title: "No title generated", followUpPrompts: [] };
//   }
// );