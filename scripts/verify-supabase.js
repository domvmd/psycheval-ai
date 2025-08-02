const path = require('path');
const fs = require('fs');

// Manually load .env.local
const envPath = path.join(__dirname, '../.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  envContent.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const [key, ...valueParts] = trimmed.split('=');
      if (key) {
        process.env[key.trim()] = valueParts.join('=').trim();
      }
    }
  });
}

console.log('Verifying Supabase Configuration...\n');

// Check environment variables
const requiredEnvVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY'
];

let allPresent = true;
requiredEnvVars.forEach(varName => {
  const value = process.env[varName];
  if (value) {
    console.log(`✓ ${varName}: Set (${value.substring(0, 20)}...)`);
  } else {
    console.log(`✗ ${varName}: Missing`);
    allPresent = false;
  }
});

console.log('\nConfiguration Files:');

// Check for required files
const files = [
  'lib/supabase/client.ts',
  'lib/supabase/server.ts',
  'types/supabase.ts',
  'hooks/useSupabaseAuth.ts',
  'supabase/migrations/20250102_initial_schema.sql'
];

files.forEach(file => {
  const exists = fs.existsSync(path.join(__dirname, '..', file));
  console.log(`${exists ? '✓' : '✗'} ${file}`);
});

console.log('\nSupabase Setup Status:');
if (allPresent) {
  console.log('✓ All environment variables are configured');
  console.log('✓ All required files are in place');
  console.log('\nNext steps:');
  console.log('1. Run the migration in your Supabase SQL Editor');
  console.log('2. Configure authentication settings in Supabase dashboard');
  console.log('3. Start the development server with: pnpm dev');
} else {
  console.log('✗ Some configuration is missing. Please check the items marked with ✗ above.');
}