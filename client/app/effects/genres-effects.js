import { commitState } from "../state/state.js";
import { getGenresData } from "../api/api.js";

export async function loadGenres() {
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
