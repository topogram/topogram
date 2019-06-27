/* eslint-disable */
/**
 * This script will extract the internationalization messages from all components
   and package them in the transalation json files in the translations file.
 */
const fs = require('fs');
const nodeGlob = require('glob');
import { transformAsync } from "@babel/core";

const animateProgress = require('./helpers/progress');
const addCheckmark = require('./helpers/checkmark');

const i18n = require('../src/helpers/i18n.js');

require('shelljs/global');

// parse babelrc for transpiling
const babelrc = JSON.parse(fs.readFileSync('./.babelrc'));

// Glob to match all js files except test files
const FILES_TO_PARSE = './src/**/*.jsx'
 // 'imports/client/**/*.jsx!(*.test).js!(*.spec).js!imports/client/helpers';
const DEST_FOLDER = 'i18n'
const locales = i18n.appLocales;

const newLine = () => process.stdout.write('\n');

// Progress Logger
let progress;
const task = (message) => {
  progress = animateProgress(message);
  process.stdout.write(message);

  return (error) => {
    if (error) {
      process.stderr.write(error);
    }
    clearTimeout(progress);
    return addCheckmark(() => newLine());
  }
}

// Wrap async functions below into a promise
const glob = (pattern) => new Promise((resolve, reject) => {
  nodeGlob(pattern, (error, value) => (error ? reject(error) : resolve(value)));
});

const readFile = (fileName) => new Promise((resolve, reject) => {
  fs.readFile(fileName, 'utf-8', (error, value) => (error ? reject(error) : resolve(value)));
});

const writeFile = (fileName, data) => new Promise((resolve, reject) => {
  fs.writeFile(fileName, data, (error, value) => (error ? reject(error) : resolve(value)));
});

// Store existing translations into memory
const oldLocaleMappings = [];
const localeMappings = [];
// Loop to run once per locale
for (const locale of locales) {
  oldLocaleMappings[locale] = {};
  localeMappings[locale] = {};
  // File to store translation messages into
  const translationFileName = `${DEST_FOLDER}/${locale}.json`;
  try {
    // Parse the old translation message JSON files
    const messages = JSON.parse(fs.readFileSync(translationFileName));
    for (const message of messages) {
      oldLocaleMappings[locale][message.id] = message;
    }
  } catch (error) {
    if (error.code !== 'ENOENT') {
      process.stderr.write(
        `There was an error loading this translation file: ${translationFileName}
        \n${error}`
      );
    }
  }
}

const extractFromFile = async (fileName) => {
  try {
    // Use babel plugin to extract instances where react-intl is used
    const code = await readFile(fileName);
    const plugins = [...babelrc.plugins, 'react-intl']
    // console.log(code);
    const { metatada : result } = await transformAsync(code, {
      presets: babelrc.presets,
      plugins: plugins,
    }).catch(e => console.log(e))

    console.log(metatada)

    for (const message of result['react-intl'].messages) {
      for (const locale of locales) {
        const oldLocaleMapping = oldLocaleMappings[locale][message.id];
        // Merge old translations into the babel extracted instances where react-intl is used
        localeMappings[locale][message.id] = {
          id: message.id,
          description: message.description,
          defaultMessage: message.defaultMessage,
          message: (oldLocaleMapping && oldLocaleMapping.message)
            ? oldLocaleMapping.message
            : '',
        };
      }
    }
  } catch (error) {
    process.stderr.write(`Error transforming file: ${fileName}\n${error}`);
  }
};

(async function main() {
  const memoryTaskDone = task('Storing language files in memory');
  const files = await glob(FILES_TO_PARSE);
  memoryTaskDone()

  const extractTaskDone = task('Run extraction on all files')
  // Run extraction on all files that match the glob on line 16
  await Promise.all(files.map((fileName) => extractFromFile(fileName)));
  extractTaskDone()

  // Make the directory if it doesn't exist, especially for first run
  mkdir('-p', DEST_FOLDER);
  for (const locale of locales) {
    const translationFileName = `${DEST_FOLDER}/${locale}.json`;
    try {
      const localeTaskDone = task(
        `Writing translation messages for ${locale} to: ${translationFileName}`
      );

      // Sort the translation JSON file so that git diffing is easier
      // Otherwise the translation messages will jump around every time we extract
      let messages = Object.values(localeMappings[locale]).sort((a, b) => {
        a = a.id.toUpperCase();
        b = b.id.toUpperCase();
        return a < b ? -1 :
            a > b ? 1 : 0
      });

      // Write to file the JSON representation of the translation messages
      const prettified = `${JSON.stringify(messages, null, 2)}\n`;

      await writeFile(translationFileName, prettified);

      localeTaskDone();
    } catch (error) {
      localeTaskDone(
        `There was an error saving this translation file: ${translationFileName}
        \n${error}`
      );
    }
  }

  process.exit()
}());
