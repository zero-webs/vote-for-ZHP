export async function onRequest({ env }) {
  const result = await env.DB.prepare(
    "SELECT COUNT(*) as c FROM votes"
  ).first();

  return Response.json({ count: result.c });
}
