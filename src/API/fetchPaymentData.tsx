import { apiBase } from "../Constants";

/**
 * A helper function to fetch data from your API.
 */
export async function fetchFromAPI(endpointURL: string, opts: any = {}) {
  const { method = "POST", body = null } = opts;

  const res = await fetch(`${apiBase}/api/${endpointURL}`, {
    method,
    ...(body && { body: JSON.stringify(body) }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.json();
}
