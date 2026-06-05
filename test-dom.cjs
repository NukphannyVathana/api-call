const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');

// Read the built index.html
const htmlPath = path.join(__dirname, 'dist', 'index.html');
let html = fs.readFileSync(htmlPath, 'utf8');

// Modify paths in index.html from /api-call/ to relative paths so JSDOM can load them from the local dist folder
html = html.replace(/\/api-call\//g, './');

console.log('Testing JSDOM environment...');

const dom = new JSDOM(html, {
  runScripts: 'dangerously',
  resources: 'usable',
  url: 'http://localhost/',
  beforeParse(window) {
    // Mock APIs not present in JSDOM
    window.localStorage = {
      getItem: () => null,
      setItem: () => {},
      clear: () => {},
      removeItem: () => {}
    };
    
    // Catch unhandled exceptions and print them
    window.addEventListener('error', (event) => {
      console.error('\x1b[31m[BROWSER ERROR]\x1b[0m', event.error || event.message);
    });
    
    window.addEventListener('unhandledrejection', (event) => {
      console.error('\x1b[31m[UNHANDLED REJECTION]\x1b[0m', event.reason);
    });
  }
});

// Wait a few seconds for scripts to load and run
setTimeout(() => {
  console.log('HTML content after 3s:');
  console.log(dom.serialize().substring(0, 1000));
  process.exit(0);
}, 3000);
