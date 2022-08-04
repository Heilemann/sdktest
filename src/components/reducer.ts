import { TState, TReducerAction } from "../interfaces";

export default function Reducer(state: TState, action: TReducerAction) {
  console.log("Reducer", state, action);

  switch (action.type) {
    case "LOAD":
      return {
        ...state,
        ...action.payload
      }

    case "UPDATE_DOCUMENT_VALUES":
      return {
        ...state,
        document: {
          ...state.document,
          ...action.payload
        }
      }

  }

  return state;
}