import { commitState } from "../../state/state.js";
import { getDetailsData } from "../../api/api.js";
import { commitError } from "../shared/commit-error.js";

let abortController = null;

export async function loadDetailsPage(route) {
  const { type, id } = route.params;

  if (!type || !id) {
    commitError(new Error("Invalid route params"));
    return;
  }

  if (abortController) {
    abortController.abort();
  }

  abortController = new AbortController();

  try {
    const data = await getDetailsData(type, id, {
      signal: abortController.signal,
    });

    commitState((state) => ({
      ...state,
      details: {
        item: data.item || null,
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
