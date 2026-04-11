import { commitState } from "../state/state.js";

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
    const searchTitle = searchResultLink.dataset.searchTitle || "";

    commitState((state) => ({
      ...state,
      searchHistory: addSearchHistoryItem(state.searchHistory, searchTitle),
      ui: {
        ...state.ui,
        activeDialog: null,
        searchDraft: searchTitle,
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

function addSearchHistoryItem(searchHistory, value) {
  const normalizedValue = value.trim();

  if (!normalizedValue) {
    return Array.isArray(searchHistory) ? searchHistory : [];
  }

  const history = Array.isArray(searchHistory) ? [...searchHistory] : [];
  const filteredHistory = history.filter(
    (item) => item.trim() !== normalizedValue,
  );

  return [normalizedValue, ...filteredHistory].slice(0, 10);
}
