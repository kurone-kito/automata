#!/usr/bin/env node
import { detectImportWithError } from '@kurone-kito/web-toybox-node';
import { deployFolders } from './io/deployFolders.mjs';

detectImportWithError(import.meta.url);
await deployFolders();
