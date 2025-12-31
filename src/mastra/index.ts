import { Mastra } from '@mastra/core/mastra';
import { VercelDeployer } from '@mastra/deployer-vercel';
import { LibSQLStore } from '@mastra/libsql';
import { PinoLogger } from '@mastra/loggers';
import { weatherWorkflow } from './workflows';
import { weatherAgent } from './agents';

export const mastra = new Mastra({
  workflows: { weatherWorkflow },
  agents: { weatherAgent },
  logger: new PinoLogger({
    name: 'Mastra',
    level: 'info',
  }),
  storage: new LibSQLStore({
    id: 'main',
    url: process.env.TURSO_DATABASE_URL || 'file:./mastra.db',
    authToken: process.env.TURSO_AUTH_TOKEN,
  }),
  deployer: new VercelDeployer({
    maxDuration: 60,
  }),
});
