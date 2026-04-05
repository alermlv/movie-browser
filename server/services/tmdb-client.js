import { env } from "../config/env.js";

export async function getTmdb(path, params = {}) {
  const url = buildTmdbUrl(path, params);
  const response = await fetchTmdb(url);
  const data = await readTmdbResponse(response);

  return data;
}

function buildTmdbUrl(path, params) {
  const url = new URL(`${env.TMDB_API_BASE_URL}${path}`);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, String(value));
    }
  });

  return url;
}

async function fetchTmdb(url) {
  return fetch(url, {
    headers: {
      Authorization: `Bearer ${env.TMDB_API_TOKEN}`,
      Accept: "application/json",
    },
  });
}

async function readTmdbResponse(response) {
  if (!response.ok) {
    const message = await readTmdbErrorMessage(response);
    const error = new Error(message);

    error.status = response.status;
    throw error;
  }

  return response.json();
}

async function readTmdbErrorMessage(response) {
  try {
    const data = await response.json();
    return data.status_message || "TMDB request failed.";
  } catch {
    return "TMDB request failed.";
  }
}
