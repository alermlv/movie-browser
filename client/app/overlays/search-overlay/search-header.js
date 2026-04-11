import { createSearchForm } from "./search-form.js";
import { createCloseSearchButton } from "./close-search-button.js";

export function createSearchHeader() {
  const header = document.createElement("div");
  header.classList.add("search-header");

  const headerInner = document.createElement("div");
  headerInner.classList.add("search-header__inner");

  const { form, input } = createSearchForm();
  const closeSearchButton = createCloseSearchButton();

  headerInner.append(form, closeSearchButton);
  header.appendChild(headerInner);

  return {
    header,
    form,
    input,
  };
}
