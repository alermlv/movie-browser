import { commitState } from "../state/state.js";
import { getDetailsData } from "../api/api.js";

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
