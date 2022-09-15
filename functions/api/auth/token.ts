import ky from "ky";

export const onRequestPost: PagesFunction = async ({ request, env }) => {
  const body = await request.json<{ refresh_token: string }>();

  const response = await ky
    .post("***REMOVED***", {
      json: {
        refresh_token: body.refresh_token,
        grant_type: "refresh_token",
      },
      searchParams: { key: env.GOOGLE_SECRET },
      headers: { "User-Agent": "RihanArfan/bereal-web" },
    })
    .text();

  const headers = { "content-type": "application/json;charset=UTF-8" };
  return new Response(response, { headers });
};
