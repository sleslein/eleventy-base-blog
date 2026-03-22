import path from 'path';
import { execSync } from 'child_process';
import fs from 'fs';

const TEST_DB = path.join(process.cwd(), 'data', 'test.db');

export default function globalSetup() {
  // Always start fresh
  if (fs.existsSync(TEST_DB)) {
    fs.unlinkSync(TEST_DB);
  }

  execSync('npx tsx src/lib/seed.ts', {
    env: { ...process.env, DB_PATH: TEST_DB },
  });
}
