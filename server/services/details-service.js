import { getTmdb } from "./tmdb-client.js";
import { normalizeDetailsItem } from "../utilities/normalize-tmdb.js";

export async function getDetailsData(detailsParams) {
  const data = await getTmdb(`/${detailsParams.type}/${detailsParams.id}`);

  return {
    item: normalizeDetailsItem(detailsParams.type, data),
  };
}
