import { LibSQLStore } from '@mastra/libsql';

// Use Turso for production (required on Vercel), local file for development
const isProduction = process.env.VERCEL || process.env.NODE_ENV === 'production';
const dbUrl = process.env.TURSO_DATABASE_URL || (isProduction ? undefined : 'file:./mastra.db');

export const storage = dbUrl
  ? new LibSQLStore({
      id: 'main',
      url: dbUrl,
      authToken: process.env.TURSO_AUTH_TOKEN,
    })
  : undefined;
