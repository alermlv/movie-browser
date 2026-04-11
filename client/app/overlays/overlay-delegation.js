import { commitState } from "../state/state.js";
import {
  createResultHistoryItem,
  addSearchHistoryItem,
} from "./search-overlay/history-service.js";

export function setupOverlayDelegation() {
  document.addEventListener("click", handleOverlayClick);
}

function handleOverlayClick(event) {
  const openDialogTrigger = event.target.closest("[data-open-dialog]");
  if (openDialogTrigger) {
    const dialogName = openDialogTrigger.dataset.openDialog;

    commitState((state) => ({
      ...state,
      ui: {
        ...state.ui,
        activeDialog: dialogName,
      },
    }));

    return;
  }

  const searchResultLink = event.target.closest("[data-search-result='true']");
  if (searchResultLink) {
    const historyItem = createResultHistoryItem({
      title: searchResultLink.dataset.searchTitle || "",
      type: searchResultLink.dataset.searchType || "",
      id: searchResultLink.dataset.searchId || "",
    });

    commitState((state) => ({
      ...state,
      searchHistory: addSearchHistoryItem(state.searchHistory, historyItem),
      ui: {
        ...state.ui,
        activeDialog: null,
      },
    }));

    return;
  }

  const searchHistoryLink = event.target.closest(
    "[data-search-history-item='true']",
  );
  if (searchHistoryLink) {
    commitState((state) => ({
      ...state,
      ui: {
        ...state.ui,
        activeDialog: null,
      },
    }));

    return;
  }

  const closeDialogTrigger = event.target.closest("[data-close-dialog]");
  if (closeDialogTrigger) {
    commitState((state) => ({
      ...state,
      ui: {
        ...state.ui,
        activeDialog: null,
      },
    }));

    return;
  }

  const dialogBackdrop = event.target.closest("[data-dialog-backdrop]");
  if (!dialogBackdrop) {
    return;
  }

  const dialogPanel = event.target.closest("[data-dialog-panel]");
  if (dialogPanel) {
    return;
  }

  commitState((state) => ({
    ...state,
    ui: {
      ...state.ui,
      activeDialog: null,
    },
  }));
}
