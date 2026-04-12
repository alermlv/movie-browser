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
  overlay.setAttribute("aria-labelledby", "search-overlay-title");
  overlay.dataset.dialog = "search";

  const title = document.createElement("h2");
  title.id = "search-overlay-title";
  title.classList.add("visually-hidden");
  title.textContent = "Search";

  const { header, form, input } = createSearchHeader();
  const { container: resultsContainer, list: resultsList } =
    createSearchResults();

  showInitialSearchState(resultsList);

  bindSearchController({
    form,
    input,
    resultsList,
  });

  overlay.append(title, header, resultsContainer);

  return overlay;
}
