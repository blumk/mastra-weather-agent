import { LibSQLStore } from '@mastra/libsql';

// Use Turso for production, or local file for development
export const storage = new LibSQLStore({
  id: 'main',
  url: process.env.TURSO_DATABASE_URL || 'file:./mastra.db',
  authToken: process.env.TURSO_AUTH_TOKEN,
});
