#!/usr/bin/env node
import { detectImportWithError } from '@kurone-kito/web-toybox-node';
import { getConfig } from './config/getConfig.mjs';
import { isLogin } from './copilot/isLogin.mjs';
import { deployFolders } from './io/deployFolders.mjs';
import { pickRequest } from './requests/pickRequest.mjs';

detectImportWithError(import.meta.url);
await deployFolders();
if (!(await isLogin())) {
  console.error('GitHub Copilot CLIにログインしてから再試行してください。');
  process.exit(1);
}
await getConfig();
await pickRequest();
