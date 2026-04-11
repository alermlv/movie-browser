import { createSearchHeader } from "./search-header.js";
import { createSearchResults } from "./search-results.js";
import {
  bindSearchController,
  showInitialSearchState,
} from "./search-controller.js";

export function createSearchOverlay() {
  const overlay = document.createElement("section");
  overlay.classList.add("search-overlay");
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.setAttribute("aria-label", "Search");
  overlay.dataset.dialog = "search";

  const { header, form, input } = createSearchHeader();
  const { container: resultsContainer, list: resultsList } =
    createSearchResults();

  showInitialSearchState(resultsList);

  bindSearchController({
    form,
    input,
    resultsList,
  });

  overlay.append(header, resultsContainer);

  queueMicrotask(() => {
    input.focus();
  });

  return overlay;
}
