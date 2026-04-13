import { commitState } from "../../state/state.js";
import { getHomeData } from "../../api/api.js";
import { commitError } from "../shared/commit-error.js";

let abortController = null;

export async function loadHomePage() {
  if (abortController) {
    abortController.abort();
  }

  abortController = new AbortController();

  try {
    const data = await getHomeData({}, { signal: abortController.signal });

    commitState((state) => ({
      ...state,
      home: {
        sections: data.sections || {},
      },
      ui: {
        ...state.ui,
        error: null,
      },
    }));
  } catch (error) {
    if (error?.name === "AbortError") return;
    commitError(error);
  }
}
