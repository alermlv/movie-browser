import { commitState } from "../../state/state.js";
import { getSearchData } from "../../api/api.js";
import { commitError } from "../shared/commit-error.js";

let abortController = null;

export async function loadSearchPage(route) {
  if (abortController) {
    abortController.abort();
  }

  const currentAbortController = new AbortController();
  abortController = currentAbortController;

  try {
    const data = await getSearchData(route.query, {
      signal: currentAbortController.signal,
    });

    commitState((state) => ({
      ...state,
      search: {
        totalPages: data.totalPages || 0,
        totalResults: data.totalResults || 0,
        items: data.items || [],
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
