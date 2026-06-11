export async function onRequest({ request, env }) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");

  const tokenRes = await fetch("https://discord.com/api/oauth2/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: env.DISCORD_CLIENT_ID,
      client_secret: env.DISCORD_CLIENT_SECRET,
      grant_type: "authorization_code",
      code,
      redirect_uri: env.DISCORD_REDIRECT_URI
    })
  });

  const token = await tokenRes.json();

  const userRes = await fetch("https://discord.com/api/users/@me", {
    headers: {
      Authorization: `Bearer ${token.access_token}`
    }
  });

  const user = await userRes.json();

  await env.DB.prepare(
    "INSERT OR IGNORE INTO users (id, discord_id) VALUES (?, ?)"
  ).bind(user.id, user.id).run();

  return new Response("Logged in. You can now vote.", {
    headers: {
      "Set-Cookie": `discord_id=${user.id}; Path=/`
    }
  });
}
