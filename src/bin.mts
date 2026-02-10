#!/usr/bin/env node
import { detectImportWithError } from '@kurone-kito/web-toybox-node';

detectImportWithError(import.meta.url);
console.log('Hello, Automata!');
