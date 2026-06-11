CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  discord_id TEXT UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS votes (
  discord_id TEXT PRIMARY KEY,
  created_at INTEGER
);