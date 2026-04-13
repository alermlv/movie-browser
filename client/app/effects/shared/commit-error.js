import { commitState } from "../../state/state.js";

export function commitError(error) {
  commitState((state) => ({
    ...state,
    ui: {
      ...state.ui,
      error: error?.message || "Unknown error",
    },
  }));
}
