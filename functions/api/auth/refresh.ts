import { Env } from "@/types/auth";

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const body = await request.json<{ refresh_token: string }>();

  const url = new URL(env.GOOGLE_REFRESH_ENDPOINT);
  url.searchParams.set("key", env.GOOGLE_SECRET);

  request = new Request(url.toString(), {
    body: JSON.stringify({
      refresh_token: body.refresh_token,
      grant_type: "refresh_token",
    }),
    method: "post",
  });

  request.headers.set("Content-Type", "application/json");
  request.headers.set("Accept", "application/json");
  request.headers.set("User-Agent", "RihanArfan/bereal-web");

  return await fetch(request);
};
