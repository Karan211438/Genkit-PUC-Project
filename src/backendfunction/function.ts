import { pluginLogs } from "../hardcodedata/pluginlogs.js";
import axios from "axios";
let crmurl=process.env.CRMURL||"https://ogre-dev.crm11.dynamics.com/api/data/v9.1/";
let BearerToken="eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkpZaEFjVFBNWl9MWDZEQmxPV1E3SG4wTmVYRSIsImtpZCI6IkpZaEFjVFBNWl9MWDZEQmxPV1E3SG4wTmVYRSJ9.eyJhdWQiOiJodHRwczovL29ncmUtZGV2LmNybTExLmR5bmFtaWNzLmNvbSIsImlzcyI6Imh0dHBzOi8vc3RzLndpbmRvd3MubmV0LzUyZDQ2NWJhLWI3YTMtNDM5NS04OTU3LTQ5OWQ3N2YyMDQ3Ny8iLCJpYXQiOjE3NTYyOTQ4MjQsIm5iZiI6MTc1NjI5NDgyNCwiZXhwIjoxNzU2Mjk4NzI0LCJhaW8iOiJrMlJnWUxpdDFiNzU0bDdkUjVmVVZ2Uk0rNnQrRmdBPSIsImFwcGlkIjoiYmM2Njc2ZDYtMTM4Ny00ZGM0LWJlODktYmExM2IwOGNlYjRlIiwiYXBwaWRhY3IiOiIxIiwiaWRwIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvNTJkNDY1YmEtYjdhMy00Mzk1LTg5NTctNDk5ZDc3ZjIwNDc3LyIsImlkdHlwIjoiYXBwIiwib2lkIjoiNjg0MWE4OWEtMDUxMy00NWZmLTgwYWYtNjhlZTMyNTNjNjhmIiwicmgiOiIxLkFUQUF1bVhVVXFPM2xVT0pWMG1kZF9JRWR3Y0FBQUFBQUFBQXdBQUFBQUFBQUFCREFRQXdBQS4iLCJzdWIiOiI2ODQxYTg5YS0wNTEzLTQ1ZmYtODBhZi02OGVlMzI1M2M2OGYiLCJ0ZW5hbnRfcmVnaW9uX3Njb3BlIjoiRVUiLCJ0aWQiOiI1MmQ0NjViYS1iN2EzLTQzOTUtODk1Ny00OTlkNzdmMjA0NzciLCJ1dGkiOiJFNXZDTVNRdHdrLWVleWxlZ3IwREFBIiwidmVyIjoiMS4wIiwieG1zX2Z0ZCI6IkNrbXRmVEVfeFlqbVd4dWVIdUhMck9ZUXhrdEZFV1Q2N1o5NW1sVlBQWVVCWlhWeWIzQmxibTl5ZEdndFpITnRjdyIsInhtc19pZHJlbCI6IjQgNyIsInhtc19yZCI6IjAuNDJMbFlCSmlOQkFTNFdBWEV0aHk2LWUyeWV5SEhDY2VPX1dzWXRXUnAwQlJUaUdCX3g2dGRiZlBHWHV1OE8wcVRkaXFidzBVNVJBU1lHZUFnQU5RR2dBIn0.KSaKUBGshpKQ4hY-j6TodM6jcBTbLJpZjyrtQAvQZNbr8A9r6mMXPTGWVyTGvzWdx9YL4sSR9PFoaqbvr6JRUb2ecfYFlQQrv1huofMkv6yN82FQCwz5O8ouIldLygiDPclFI1rKnwbaIeuZwADNb5Id8CW89xZ9BsnrKo2Vkcmc-90UFT9LDyo2aueh4mCGdch4xSbi_g_UfDTnP-qJ_XIcefUStXFUMtcHV7IYJh3okFbkYuMaBrec5gSFjBzpU2aljGasunuw14ERIqq5K9vxoEV3MCmv3gI__Ls-B17jGpTSHxrd2B2tvSUICCeg6QuLH0V7yblFLFMt0OH_MA";
export async function getPluginTraceDetails() {
  try {
    if (!pluginLogs || pluginLogs.length === 0) {
      return "No plugin trace logs were found. It's possible that trace logging is disabled in your environment.";
    } else {
      return `These are the top plugin trace logs from your CRM environment:\n${JSON.stringify(pluginLogs, null, 2)}`;
    }
  } catch (error: any) {
    return `Failed to fetch plugin trace logs. Reason: ${error.message}`;
  }
}
export async function retrieve_entity_metadata(partialmetadataurl: string): Promise<any> {
    const fullUrl = `${crmurl}${partialmetadataurl}`;
  try {
    const response = await axios.get(fullUrl, {
      headers: {
        Authorization: `Bearer ${BearerToken}`,
        Accept: "application/json",
        "OData-MaxVersion": "4.0",
        "OData-Version": "4.0"
      }
    });
    console.log("Entity Metadata:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Error retrieving entity metadata:", error.message);
    return `Error retrieving entity metadata: ${error.message}`;
    //throw error;
  }
}