import { commitState } from "../state/state.js";
import { getSearchData } from "../services/api.js";

export async function loadSearchPage(route) {
  startLoading();

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
        isLoading: false,
        error: null,
      },
    }));
  } catch (error) {
    finishWithError(error);
  }
}

function startLoading() {
  commitState((state) => ({
    ...state,
    ui: {
      ...state.ui,
      isLoading: true,
      error: null,
    },
  }));
}

function finishWithError(error) {
  commitState((state) => ({
    ...state,
    ui: {
      ...state.ui,
      isLoading: false,
      error: error.message,
    },
  }));
}
