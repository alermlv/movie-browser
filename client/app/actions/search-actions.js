import { commitState } from "../state/state.js";
import { getSearchData } from "../services/api.js";

export async function loadSearchPage(route) {
  try {
    const data = await getSearchData(route.query);

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
    commitState((state) => ({
      ...state,
      ui: {
        ...state.ui,
        error: error.message,
      },
    }));
  }
}
