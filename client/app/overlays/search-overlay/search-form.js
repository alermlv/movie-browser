export function createSearchForm() {
  const form = document.createElement("form");
  form.classList.add("search-overlay__form");
  form.setAttribute("role", "search");
  form.noValidate = true;

  const input = document.createElement("input");
  input.classList.add("search-overlay__input");
  input.type = "search";
  input.name = "q";
  input.placeholder = "Search";
  input.autocomplete = "off";
  input.spellcheck = false;
  input.setAttribute("aria-label", "Search");
  input.dataset.autofocus = "true";

  form.appendChild(input);

  return {
    form,
    input,
  };
}
