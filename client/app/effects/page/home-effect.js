import { commitState } from "../../state/state.js";
import { getHomeData } from "../../api/api.js";
import { commitError } from "../shared/commit-error.js";

let abortController = null;

export async function loadHomePage() {
  if (abortController) {
    abortController.abort();
  }

  const currentAbortController = new AbortController();
  abortController = currentAbortController;

  try {
    const data = await getHomeData(
      {},
      { signal: currentAbortController.signal },
    );

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
    if (error?.name === "AbortError") {
      return;
    }

    commitError(error);
  } finally {
    if (abortController === currentAbortController) {
      abortController = null;
    }
  }
}
