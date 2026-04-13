import { commitState } from "../state/state.js";
import { getDetailsData, getHomeData, getSearchData } from "../api/api.js";

export async function loadHomePage() {
  try {
    const data = await getHomeData();

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
    commitState((state) => ({
      ...state,
      ui: {
        ...state.ui,
        error: error.message,
      },
    }));
  }
}

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

export async function loadDetailsPage(route) {
  const { type, id } = route.params;

  if (!type || !id) {
    return;
  }

  try {
    const data = await getDetailsData(type, id);

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
    commitState((state) => ({
      ...state,
      ui: {
        ...state.ui,
        error: error.message,
      },
    }));
  }
}
