import { commitState } from "../../state/state.js";
import { getSearchData } from "../../api/api.js";
import { commitError } from "../shared/commit-error.js";

let requestId = 0;

export async function loadSearchPage(route) {
  const currentRequestId = ++requestId;

  try {
    const data = await getSearchData(route.query);

    if (currentRequestId !== requestId) return;

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
    if (currentRequestId !== requestId) return;
    commitError(error);
  }
}
