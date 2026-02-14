#!/usr/bin/env node
import { detectImportWithError } from '@kurone-kito/web-toybox-node';
import { getConfig } from './config/getConfig.mjs';
import { isLogin } from './copilot/isLogin.mjs';
import { searchOccupation } from './robots/research/occupation.mjs';
import { getTasks } from './tasks/getTasks.mjs';
import { getPathes } from './tools/getPathes.mjs';

detectImportWithError(import.meta.url);
if (!(await isLogin())) {
  console.error('GitHub Copilot CLIにログインしてから再試行してください。');
  process.exit(1);
}
const { model } = await getConfig();
console.log(`Using model: ${model}`);
await getPathes();
if ((await getTasks('research', ['occupation'])).length < 100) {
  console.log(await searchOccupation(model));
}
