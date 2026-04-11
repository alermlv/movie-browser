export function createSearchForm() {
  const form = document.createElement("form");
  form.classList.add("search-form");
  form.setAttribute("role", "search");
  form.noValidate = true;

  const input = document.createElement("input");
  input.classList.add("search-form__input");
  input.type = "search";
  input.name = "q";
  input.placeholder = "Search";
  input.autocomplete = "off";
  input.spellcheck = false;
  input.value = "";
  input.setAttribute("aria-label", "Search");

  form.appendChild(input);

  return {
    form,
    input,
  };
}
