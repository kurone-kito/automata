#!/usr/bin/env node
import { detectImportWithError } from '@kurone-kito/web-toybox-node';
import { getConfig } from './config/getConfig.mjs';

detectImportWithError(import.meta.url);
const { model } = await getConfig();
console.log(`Using model: ${model}`);
