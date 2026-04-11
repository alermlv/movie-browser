import { commitState } from "../state/state.js";
import { getHomeData } from "../api/api.js";

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
