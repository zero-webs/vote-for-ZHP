export async function onRequestPost({ request, env }) {
  const cookie = request.headers.get("Cookie") || "";
  const discordId = cookie.split("discord_id=")[1];

  if (!discordId) {
    return Response.json({ error: "Not logged in" });
  }

  const exists = await env.DB.prepare(
    "SELECT discord_id FROM votes WHERE discord_id = ?"
  ).bind(discordId).first();

  if (exists) {
    return Response.json({ error: "Already voted" });
  }

  await env.DB.prepare(
    "INSERT INTO votes (discord_id, created_at) VALUES (?, ?)"
  ).bind(discordId, Date.now()).run();

  const count = await env.DB.prepare(
    "SELECT COUNT(*) as c FROM votes"
  ).first();

  return Response.json({ success: true, count: count.c });
}
