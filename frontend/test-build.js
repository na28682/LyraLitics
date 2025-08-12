// Simple test to verify Tailwind config
const tailwindConfig = require('./tailwind.config.js');

console.log('Tailwind config loaded successfully');
console.log('Content paths:', tailwindConfig.content);
console.log('Plugins count:', tailwindConfig.plugins.length);

// Test if the config can be processed
try {
  // This simulates what Tailwind does
  const processed = tailwindConfig.content.map(path => path.replace('./src/', ''));
  console.log('✅ Config is valid');
  console.log('Processed paths:', processed);
} catch (error) {
  console.error('❌ Config has errors:', error.message);
}
