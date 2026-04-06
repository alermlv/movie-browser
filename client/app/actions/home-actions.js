import { commitState } from "../state/state.js";
import { getHomeData } from "../services/api.js";

export async function loadHomePage() {
  startLoading();

  try {
    const data = await getHomeData();

    commitState((state) => ({
      ...state,
      home: {
        sections: data.sections || {},
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
