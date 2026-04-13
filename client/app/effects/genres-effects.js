import { commitState } from "../state/state.js";
import { getGenresData } from "../api/api.js";
import { commitError } from "./shared/commit-error.js";

let abortController = null;

export async function loadGenres() {
  if (abortController) {
    abortController.abort();
  }

  const currentAbortController = new AbortController();
  abortController = currentAbortController;

  try {
    const data = await getGenresData(
      {},
      { signal: currentAbortController.signal },
    );

    commitState((state) => ({
      ...state,
      genres: {
        byType: {
          movie: data?.byType?.movie || {},
          tv: data?.byType?.tv || {},
        },
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
