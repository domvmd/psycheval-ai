#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying project setup...\n');

const checks = [
  // Configuration files
  { path: 'next.config.js', type: 'file', description: 'Next.js configuration' },
  { path: 'tsconfig.json', type: 'file', description: 'TypeScript configuration' },
  { path: 'tailwind.config.ts', type: 'file', description: 'Tailwind CSS configuration' },
  { path: 'postcss.config.js', type: 'file', description: 'PostCSS configuration' },
  { path: '.eslintrc.json', type: 'file', description: 'ESLint configuration' },
  { path: '.prettierrc', type: 'file', description: 'Prettier configuration' },
  { path: 'components.json', type: 'file', description: 'shadcn/ui configuration' },
  { path: '.env.local.example', type: 'file', description: 'Environment variables example' },
  
  // Directories
  { path: 'app', type: 'dir', description: 'Next.js App Router directory' },
  { path: 'components', type: 'dir', description: 'Components directory' },
  { path: 'components/ui', type: 'dir', description: 'UI components directory' },
  { path: 'lib', type: 'dir', description: 'Library/utilities directory' },
  { path: 'hooks', type: 'dir', description: 'Custom hooks directory' },
  { path: 'types', type: 'dir', description: 'TypeScript types directory' },
  { path: 'public', type: 'dir', description: 'Public assets directory' },
  { path: '__tests__', type: 'dir', description: 'Tests directory' },
  { path: '.husky', type: 'dir', description: 'Git hooks directory' },
  
  // Key files
  { path: 'app/layout.tsx', type: 'file', description: 'Root layout' },
  { path: 'app/page.tsx', type: 'file', description: 'Home page' },
  { path: 'app/globals.css', type: 'file', description: 'Global styles' },
  { path: 'lib/utils.ts', type: 'file', description: 'Utility functions' },
  { path: 'lib/env.ts', type: 'file', description: 'Environment validation' },
  { path: 'types/index.ts', type: 'file', description: 'Type definitions' },
];

let passed = 0;
let failed = 0;

// Check TypeScript strict mode
function checkTypeScriptStrict() {
  try {
    const tsconfig = JSON.parse(fs.readFileSync('tsconfig.json', 'utf-8'));
    if (tsconfig.compilerOptions?.strict === true) {
      console.log('✅ TypeScript strict mode enabled');
      passed++;
    } else {
      console.log('❌ TypeScript strict mode not enabled');
      failed++;
    }
  } catch (error) {
    console.log('❌ Could not verify TypeScript configuration');
    failed++;
  }
}

// Check Prettier configuration
function checkPrettierConfig() {
  try {
    const prettierrc = JSON.parse(fs.readFileSync('.prettierrc', 'utf-8'));
    const expected = {
      semi: true,
      singleQuote: true,
      tabWidth: 2,
      printWidth: 100,
      trailingComma: 'es5'
    };
    
    let configCorrect = true;
    for (const [key, value] of Object.entries(expected)) {
      if (prettierrc[key] !== value) {
        configCorrect = false;
        break;
      }
    }
    
    if (configCorrect) {
      console.log('✅ Prettier configuration matches standards');
      passed++;
    } else {
      console.log('❌ Prettier configuration does not match standards');
      failed++;
    }
  } catch (error) {
    console.log('❌ Could not verify Prettier configuration');
    failed++;
  }
}

// Run all checks
checks.forEach(check => {
  const fullPath = path.join(process.cwd(), check.path);
  const exists = fs.existsSync(fullPath);
  
  if (exists) {
    const stat = fs.statSync(fullPath);
    const isCorrectType = (check.type === 'file' && stat.isFile()) || 
                         (check.type === 'dir' && stat.isDirectory());
    
    if (isCorrectType) {
      console.log(`✅ ${check.description}`);
      passed++;
    } else {
      console.log(`❌ ${check.description} (wrong type)`);
      failed++;
    }
  } else {
    console.log(`❌ ${check.description} (not found)`);
    failed++;
  }
});

// Run additional checks
checkTypeScriptStrict();
checkPrettierConfig();

// Summary
console.log('\n📊 Summary:');
console.log(`✅ Passed: ${passed}`);
console.log(`❌ Failed: ${failed}`);
console.log(`📈 Total: ${passed + failed}`);

if (failed === 0) {
  console.log('\n🎉 All checks passed! Project setup is complete.');
  process.exit(0);
} else {
  console.log('\n⚠️  Some checks failed. Please review the setup.');
  process.exit(1);
}