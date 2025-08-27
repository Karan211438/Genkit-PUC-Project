import { z } from "genkit";
import { ai } from "../config/aiconfig.js";
export const DispatcherInput = z.object({//common input for all flows..
  prompt: z.string(),
});
export const DispatcherOutput = z.object({//output for dispatcher flow only 
  flowName: z.string().optional(), 
});
export const ChatResponseOutput = z.object({//output for normal chat flow only
  tittle: z.string(),
  response: z.string(),
  followpprompts: z.array(z.string()),
  timestamp: z.string(),
});
export const PluginFilterOutput = z.object({//output for plugin filter floww only 
  pluginfilter: z.object({
    recordCount: z.string().optional(),
    pluginTypeName: z.string().optional(),
    entityLogicalName: z.string().optional(),
    messagename: z.string().optional(),
    operationType: z.string().optional(),
    correlationId: z.string().optional(),
    userName: z.string().optional(),
    errorMessage: z.string().optional(),
    exceptionOnly: z.boolean().optional(),
    maxduration: z.string().optional(),
    minduration: z.string().optional(),
    dateRange: z
      .object({
        startDate: z.string().optional(),
        endDate: z.string().optional(),
      })
      .optional(),
    processType: z.string().optional(),
    executionStage: z.string().optional(),
    executionMode: z.string().optional(),
    stepName: z.string().optional(),
    rank: z.string().optional(),
  }),
});
export const RetrieveEntityMetadataOutput = z.object({
  partialmetadataurl: z.string(),
  entity: z.string(),
  attribute: z.string(),
});