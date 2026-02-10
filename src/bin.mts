#!/usr/bin/env node
import { detectImportWithError } from '@kurone-kito/web-toybox-node';
import { isLogin } from './copilot/isLogin.mjs';
import { deployFolders } from './io/deployFolders.mjs';

detectImportWithError(import.meta.url);
await deployFolders();
if (!(await isLogin())) {
  console.error('GitHub Copilot CLIにログインしてから再試行してください。');
  process.exit(1);
}
