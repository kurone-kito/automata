#!/usr/bin/env node
import { detectImportWithError } from '@kurone-kito/web-toybox-node';
import { getConfig } from './config/getConfig.mjs';
import { getPathes } from './tools/getPathes.mjs';

detectImportWithError(import.meta.url);
const { model } = await getConfig();
console.log(`Using model: ${model}`);
await getPathes();
