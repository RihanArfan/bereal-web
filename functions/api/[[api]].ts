import jwtDecode, { type JwtPayload } from "jwt-decode";

const isExpired = (token: string): boolean => {
  const decoded = jwtDecode<JwtPayload>(token);
  return (decoded.exp ?? 0) < Date.now() / 1000; // decoded.exp is in seconds, Date.now() is in milliseconds
};

// fix for type string | string[], and path separated by ,
const formatPath = (query: string | string[]): string => {
  if (Array.isArray(query)) return query.join("/");
  return query.replace(",", "/");
};

export const onRequest: PagesFunction = async ({ request, params }) => {
  const token = request.headers.get("Authorization")?.replace("Bearer ", "");
  if (!token || isExpired(token))
    return new Response("Unauthorized", { status: 401 });

  const API_ENDPOINT = "***REMOVED***";
  const search = new URL(request.url).search;
  const url = new URL(`/api/${formatPath(params.api)}${search}`, API_ENDPOINT);

  const headers = new Headers();
  headers.set("Accept", request.headers.get("Accept"));
  headers.set("Authorization", request.headers.get("Authorization"));
  headers.set("Content-Type", request.headers.get("Content-Type"));
  headers.set("User-Agent", "RihanArfan/bereal-web");

  const { body, method } = request;
  request = new Request(url.toString(), { body, method, headers });

  return await fetch(request);
};
