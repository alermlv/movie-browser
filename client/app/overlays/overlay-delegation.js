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
