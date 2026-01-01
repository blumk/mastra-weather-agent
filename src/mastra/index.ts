import { Mastra } from '@mastra/core/mastra';
import { VercelDeployer } from '@mastra/deployer-vercel';
import { PinoLogger } from '@mastra/loggers';
import { weatherWorkflow } from './workflows';
import { weatherAgent } from './agents';
import { storage } from './storage';
import { Observability } from "@mastra/observability";

export const mastra = new Mastra({
  workflows: { weatherWorkflow },
  agents: { weatherAgent },
  logger: new PinoLogger({
    name: 'Mastra',
    level: 'info',
  }),
  observability: new Observability({ default: { enabled: true } }),
  storage,
  deployer: new VercelDeployer({
    maxDuration: 60,
  }),
});
