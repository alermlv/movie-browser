import { commitState, getState } from "../state/state.js";
import {
  createResultHistoryItem,
  addSearchHistoryItem,
} from "./search-overlay/history-service.js";

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "area[href]",
  "button:not([disabled])",
  "input:not([disabled]):not([type='hidden'])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "iframe",
  "object",
  "embed",
  "[contenteditable]",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

let lastDialogTrigger = null;
let previousActiveElement = null;

export function setupOverlayDelegation() {
  document.addEventListener("click", handleOverlayClick);
  document.addEventListener("keydown", handleOverlayKeydown);
}

function handleOverlayClick(event) {
  const openDialogTrigger = event.target.closest("[data-open-dialog]");
  if (openDialogTrigger) {
    lastDialogTrigger = openDialogTrigger;
    previousActiveElement =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    const dialogName = openDialogTrigger.dataset.openDialog;

    commitState((state) => ({
      ...state,
      ui: {
        ...state.ui,
        activeDialog: dialogName,
      },
    }));

    queueMicrotask(() => {
      applyDialogSideEffects();
    });

    return;
  }

  const searchResultLink = event.target.closest("[data-search-result='true']");
  if (searchResultLink) {
    const historyItem = createResultHistoryItem({
      title: searchResultLink.dataset.searchTitle || "",
      type: searchResultLink.dataset.searchType || "",
      id: searchResultLink.dataset.searchId || "",
    });

    closeActiveDialog({
      beforeClose: (state) => ({
        ...state,
        searchHistory: addSearchHistoryItem(state.searchHistory, historyItem),
      }),
    });

    return;
  }

  const searchHistoryLink = event.target.closest(
    "[data-search-history-item='true']",
  );
  if (searchHistoryLink) {
    closeActiveDialog();
    return;
  }

  const closeDialogTrigger = event.target.closest("[data-close-dialog]");
  if (closeDialogTrigger) {
    closeActiveDialog();
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

  closeActiveDialog();
}

function handleOverlayKeydown(event) {
  const activeDialog = getState().ui.activeDialog;

  if (!activeDialog) {
    return;
  }

  if (event.key === "Escape") {
    event.preventDefault();
    closeActiveDialog();
    return;
  }

  if (event.key === "Tab") {
    trapFocus(event);
  }
}

function closeActiveDialog(options = {}) {
  const { beforeClose } = options;

  commitState((state) => {
    const nextState =
      typeof beforeClose === "function" ? beforeClose(state) : state;

    return {
      ...nextState,
      ui: {
        ...nextState.ui,
        activeDialog: null,
      },
    };
  });

  removeBackgroundInert();
  restoreFocusAfterClose();
}

function trapFocus(event) {
  const dialogElement = getActiveDialogElement();

  if (!dialogElement) {
    return;
  }

  const focusableElements = getFocusableElements(dialogElement);

  if (!focusableElements.length) {
    event.preventDefault();
    dialogElement.focus();
    return;
  }

  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];
  const activeElement = document.activeElement;

  if (event.shiftKey) {
    if (
      activeElement === firstElement ||
      !dialogElement.contains(activeElement)
    ) {
      event.preventDefault();
      lastElement.focus();
    }

    return;
  }

  if (activeElement === lastElement || !dialogElement.contains(activeElement)) {
    event.preventDefault();
    firstElement.focus();
  }
}

function applyDialogSideEffects() {
  applyBackgroundInert();

  const dialogElement = getActiveDialogElement();

  if (!dialogElement) {
    return;
  }

  const autofocusTarget =
    dialogElement.querySelector("[data-autofocus]") ||
    getFocusableElements(dialogElement)[0];

  if (autofocusTarget instanceof HTMLElement) {
    autofocusTarget.focus();
    return;
  }

  if (!dialogElement.hasAttribute("tabindex")) {
    dialogElement.setAttribute("tabindex", "-1");
  }

  dialogElement.focus();
}

function getActiveDialogElement() {
  const overlayRoot = document.getElementById("overlay-root");

  if (!overlayRoot) {
    return null;
  }

  return overlayRoot.querySelector("[role='dialog']");
}

function getFocusableElements(container) {
  return [...container.querySelectorAll(FOCUSABLE_SELECTOR)].filter(
    (element) =>
      element instanceof HTMLElement &&
      !element.hasAttribute("disabled") &&
      !element.getAttribute("aria-hidden") &&
      isVisible(element),
  );
}

function isVisible(element) {
  const style = window.getComputedStyle(element);

  return style.display !== "none" && style.visibility !== "hidden";
}

function applyBackgroundInert() {
  const app = document.getElementById("app");
  const overlayRoot = document.getElementById("overlay-root");

  if (!app || !overlayRoot) {
    return;
  }

  [...app.children].forEach((child) => {
    if (!(child instanceof HTMLElement)) {
      return;
    }

    if (child === overlayRoot) {
      child.removeAttribute("inert");
      child.removeAttribute("aria-hidden");
      return;
    }

    child.setAttribute("inert", "");
    child.setAttribute("aria-hidden", "true");
  });
}

function removeBackgroundInert() {
  const app = document.getElementById("app");
  const overlayRoot = document.getElementById("overlay-root");

  if (!app || !overlayRoot) {
    return;
  }

  [...app.children].forEach((child) => {
    if (!(child instanceof HTMLElement)) {
      return;
    }

    if (child === overlayRoot) {
      child.removeAttribute("inert");
      child.removeAttribute("aria-hidden");
      return;
    }

    child.removeAttribute("inert");
    child.removeAttribute("aria-hidden");
  });
}

function restoreFocusAfterClose() {
  const preferredTarget = getRestoreFocusTarget();

  queueMicrotask(() => {
    if (
      preferredTarget instanceof HTMLElement &&
      document.contains(preferredTarget)
    ) {
      preferredTarget.focus();
    }

    lastDialogTrigger = null;
    previousActiveElement = null;
  });
}

function getRestoreFocusTarget() {
  if (
    lastDialogTrigger instanceof HTMLElement &&
    document.contains(lastDialogTrigger)
  ) {
    return lastDialogTrigger;
  }

  if (
    previousActiveElement instanceof HTMLElement &&
    document.contains(previousActiveElement)
  ) {
    return previousActiveElement;
  }

  return null;
}
