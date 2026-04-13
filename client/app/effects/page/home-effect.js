import { commitState } from "../../state/state.js";
import { getHomeData } from "../../api/api.js";
import { commitError } from "../shared/commit-error.js";

let requestId = 0;

export async function loadHomePage() {
  const currentRequestId = ++requestId;

  try {
    const data = await getHomeData();

    if (currentRequestId !== requestId) return;

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
    if (currentRequestId !== requestId) return;
    commitError(error);
  }
}
