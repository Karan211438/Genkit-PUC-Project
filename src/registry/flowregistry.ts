import { AdditionFlow ,MultiplicationFlow,SubtractionFlow,execute_retrieve_query} from "../flows/flow.js";
export const flowRegistry = {
  addition: AdditionFlow,
  subtraction: SubtractionFlow,
  multiplication: MultiplicationFlow,
  execute_retrieve_query: execute_retrieve_query, 
};
