import { commitState } from "../state/state.js";
import { getGenresData } from "../services/api.js";

export async function loadGenres() {
  startLoading();

  try {
    const data = await getGenresData();

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
