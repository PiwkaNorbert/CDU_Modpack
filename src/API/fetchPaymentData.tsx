/**
 * A helper function to fetch data from your API.
 */
export async function fetchFromAPI(endpointURL: string, opts: any = {}) {
  const isDev = import.meta.env.VITE_NODE_ENV === "development";
  const apiBase = isDev ? "https://www.trainjumper.com" : "";

  const { method = "POST", body = null } = opts;

  const res = await fetch(`${apiBase}/api/${endpointURL}`, {
    method,
    ...(body && { body: JSON.stringify(body) }),
    headers: {
      "Content-Type": "application/json",
    },
    mode: "no-cors",
  });

  return res.json();
}
