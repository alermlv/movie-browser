import { commitState } from "../state/state.js";
import { getDetailsData } from "../services/api.js";

export async function loadDetailsPage(route) {
  const { type, id } = route.params;

  if (!type || !id) {
    return;
  }

  startLoading();

  try {
    const data = await getDetailsData(type, id);

    commitState((state) => ({
      ...state,
      details: {
        item: data.item || null,
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
