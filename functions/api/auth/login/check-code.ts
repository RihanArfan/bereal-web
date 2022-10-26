import { Env, CheckCodeResponse } from "@/types/auth";

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const body = await request.json<{ request_id: string; code: string }>();

  if (!body.request_id) return errorResponse("request_id is required", 400);
  if (!body.code) return errorResponse("code is required", 400);
  if (body.code.length !== 6) return errorResponse("code is invalid", 401);

  const validateResponse = await validateCode(env, body.request_id, body.code);
  if (!validateResponse.ok) return errorResponse("failed to check code", 500);

  const validateResponseBody = await validateResponse.json<CheckCodeResponse>();
  switch (validateResponseBody.status) {
    case "6":
      return errorResponse("verification window invalid", 410);
    case "16":
      return errorResponse("code is invalid", 401);
  }

  const response = await requestRefreshToken(env, validateResponseBody.token);
  if (!response.ok) return errorResponse("failed to get refresh token", 400);

  return response;
};

const errorResponse = (message: string, status: number) =>
  new Response(JSON.stringify({ message }), { status });

const validateCode = (env: Env, request_id: string, code: string) => {
  const url = new URL(env.BEREAL_AUTH_VERIFY_ENDPOINT);

  const request = new Request(url.toString(), {
    body: JSON.stringify({ vonageRequestId: request_id, code }),
    method: "post",
  });

  request.headers.set("Content-Type", "application/json");
  request.headers.set("Accept", "application/json");
  request.headers.set("User-Agent", "RihanArfan/bereal-web");

  return fetch(request);
};

const requestRefreshToken = (env: Env, token: string) => {
  const url = new URL(env.GOOGLE_TOKEN_ENDPOINT);
  url.searchParams.set("key", env.GOOGLE_SECRET);

  const request = new Request(url.toString(), {
    body: JSON.stringify({ token: token, returnSecureToken: true }),
    method: "post",
  });

  request.headers.set("Content-Type", "application/json");
  request.headers.set("Accept", "application/json");
  request.headers.set("User-Agent", "RihanArfan/bereal-web");

  return fetch(request);
};
