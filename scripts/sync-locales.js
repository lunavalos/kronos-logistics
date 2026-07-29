const fs = require('fs');
const path = require('path');

const messagesDir = path.join(__dirname, '../messages');
const outputDir = path.join(__dirname, '../src/i18n');
const outputFile = path.join(outputDir, 'locales.json');

try {
  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Scan messages/ directory
  const files = fs.readdirSync(messagesDir);
  const locales = files
    .filter(file => file.endsWith('.json'))
    .map(file => path.basename(file, '.json'))
    .filter(locale => /^[a-z]{2}(-[A-Z]{2})?$/.test(locale)); // Only match standard codes like en, es, pt-BR, etc.

  // Default fallback if no files found
  if (locales.length === 0) {
    locales.push('en');
  }

  // Sort them so default 'en' is first if exists, then alphabetical
  locales.sort((a, b) => {
    if (a === 'en') return -1;
    if (b === 'en') return 1;
    return a.localeCompare(b);
  });

  fs.writeFileSync(outputFile, JSON.stringify(locales, null, 2));
  console.log(`[Locale Sync] Successfully sync'd locales: ${JSON.stringify(locales)}`);
} catch (error) {
  console.error('[Locale Sync] Error generating locales list:', error);
  process.exit(1);
}
