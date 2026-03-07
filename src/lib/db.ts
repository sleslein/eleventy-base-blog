import Database from 'better-sqlite3';
import path from 'path';

const DB_PATH = process.env.DB_PATH || path.join('/data', 'bloodbowl.db');

let db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (db) return db;

  db = new Database(DB_PATH);
  db.pragma('journal_mode = WAL');

  db.exec(`
    CREATE TABLE IF NOT EXISTS games (
      id            INTEGER PRIMARY KEY AUTOINCREMENT,
      opponent_name TEXT    NOT NULL,
      opponent_race TEXT    NOT NULL,
      result        TEXT    NOT NULL CHECK(result IN ('W', 'L', 'D')),
      score_for     INTEGER NOT NULL,
      score_against INTEGER NOT NULL,
      date          TEXT    NOT NULL,
      league        TEXT,
      notes         TEXT,
      created_at    TEXT    DEFAULT CURRENT_TIMESTAMP
    )
  `);

  return db;
}
