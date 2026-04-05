import { getTmdb } from "./tmdb-client.js";

export async function getDetailsData(detailsParams) {
  const data = await getTmdb(`/${detailsParams.type}/${detailsParams.id}`);

  return {
    item: data,
  };
}
