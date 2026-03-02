#!/usr/bin/env node
/**
 * Reads a Firebase service account JSON file and outputs it as one line
 * for pasting into Vercel env FIREBASE_SERVICE_ACCOUNT_JSON.
 *
 * Usage: node scripts/minify-service-account.js path/to/service-account.json
 * Or:   node scripts/minify-service-account.js   (reads ./service-account.json)
 */

const fs = require('fs');
const path = require('path');

const file = process.argv[2] || path.join(__dirname, '..', 'service-account.json');

if (!fs.existsSync(file)) {
  console.error('File not found:', file);
  console.error('Usage: node scripts/minify-service-account.js [path/to/service-account.json]');
  process.exit(1);
}

const json = fs.readFileSync(file, 'utf8');
const parsed = JSON.parse(json);
const oneLine = JSON.stringify(parsed);

console.log('\nCopy everything below (one line) into Vercel → FIREBASE_SERVICE_ACCOUNT_JSON:\n');
console.log(oneLine);
console.log('\n');
