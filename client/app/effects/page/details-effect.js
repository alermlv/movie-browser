import { commitState } from "../../state/state.js";
import { getDetailsData } from "../../api/api.js";
import { commitError } from "../shared/commit-error.js";

let requestId = 0;

export async function loadDetailsPage(route) {
  const { type, id } = route.params;

  if (!type || !id) {
    commitError(new Error("Invalid route params"));
    return;
  }

  const currentRequestId = ++requestId;

  try {
    const data = await getDetailsData(type, id);

    if (currentRequestId !== requestId) return;

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
    if (currentRequestId !== requestId) return;
    commitError(error);
  }
}
