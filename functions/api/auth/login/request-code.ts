type Env = { GOOGLE_SECRET: string };

export const onRequestPost: PagesFunction<Env> = async ({ request }) => {
  const body = await request.json<{ deviceId: string; phone: string }>();

  const url = new URL("***REMOVED***");

  const requestRequest = new Request(url.toString(), {
    body: JSON.stringify({ deviceId: body.deviceId, phoneNumber: body.phone }),
    method: "post",
  });

  requestRequest.headers.set("Content-Type", "application/json");
  requestRequest.headers.set("Accept", "application/json");
  requestRequest.headers.set("User-Agent", "RihanArfan/bereal-web");

  const response = await fetch(requestRequest);
  if (!response.ok) return errorResponse("Failed to get refresh token", 400);

  return new Response(JSON.stringify(await response.json()));
};

const errorResponse = (message: string, status: number) =>
  new Response(JSON.stringify({ message }), { status });
