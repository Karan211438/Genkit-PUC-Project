import {NormalChatFlow,getPluginTraceLogFilter,RetrieveEntityMetadataFlow} from "../chatflows/flow.js";
export const flowRegistry = {
  getPluginTraceLogFilter:getPluginTraceLogFilter,
  retrieveEntityMetadata:RetrieveEntityMetadataFlow,
  unknown:NormalChatFlow,
};
