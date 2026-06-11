export async function onRequest({ env }) {
  const url =
`https://discord.com/oauth2/authorize?client_id=${env.DISCORD_CLIENT_ID}` +
`&response_type=code&redirect_uri=${encodeURIComponent(env.DISCORD_REDIRECT_URI)}` +
`&scope=identify`;

  return Response.redirect(url, 302);
}
