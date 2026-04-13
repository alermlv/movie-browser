import { API_BASE_URL } from "../config/config.js";

export async function getHomeData(params = {}, options = {}) {
  return getJson("/home", params, options);
}

export async function getSearchData(params = {}, options = {}) {
  return getJson("/search", params, options);
}

export async function getDetailsData(type, id, options = {}) {
  if (type === "movie") {
    return getJson(`/movie/${encodeURIComponent(id)}`, {}, options);
  }

  if (type === "tv") {
    return getJson(`/tv/${encodeURIComponent(id)}`, {}, options);
  }

  throw new Error("Invalid details type");
}

export async function getGenresData(params = {}) {
  return getJson("/genres", params);
}

async function getJson(path, params = {}, options = {}) {
  const url = buildUrl(path, params);
  const response = await fetch(url, {
    signal: options.signal,
  });

  if (!response.ok) {
    throw await createApiError(response);
  }

  return response.json();
}

function buildUrl(path, params = {}) {
  const url = new URL(`${API_BASE_URL}${path}`, window.location.origin);

  Object.entries(params).forEach(([key, value]) => {
    if (
      key !== "signal" &&
      value !== undefined &&
      value !== null &&
      value !== ""
    ) {
      url.searchParams.set(key, String(value));
    }
  });

  return url;
}

async function createApiError(response) {
  try {
    const data = await response.json();
    return new Error(data?.error?.message || "API request failed.");
  } catch {
    return new Error("API request failed.");
  }
}
