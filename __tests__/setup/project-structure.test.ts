import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Project Structure', () => {
  const rootDir = process.cwd();

  it('should have Next.js configuration file', () => {
    const nextConfigPath = path.join(rootDir, 'next.config.js');
    expect(fs.existsSync(nextConfigPath)).toBe(true);
  });

  it('should have TypeScript configuration with strict mode', () => {
    const tsconfigPath = path.join(rootDir, 'tsconfig.json');
    expect(fs.existsSync(tsconfigPath)).toBe(true);
    
    const tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, 'utf-8'));
    expect(tsconfig.compilerOptions.strict).toBe(true);
  });

  it('should have Tailwind CSS configuration', () => {
    const tailwindConfigPath = path.join(rootDir, 'tailwind.config.ts');
    expect(fs.existsSync(tailwindConfigPath)).toBe(true);
  });

  it('should have PostCSS configuration', () => {
    const postcssConfigPath = path.join(rootDir, 'postcss.config.js');
    expect(fs.existsSync(postcssConfigPath)).toBe(true);
  });

  it('should have ESLint configuration', () => {
    const eslintrcPath = path.join(rootDir, '.eslintrc.json');
    expect(fs.existsSync(eslintrcPath)).toBe(true);
  });

  it('should have Prettier configuration', () => {
    const prettierrcPath = path.join(rootDir, '.prettierrc');
    expect(fs.existsSync(prettierrcPath)).toBe(true);
    
    const prettierConfig = JSON.parse(fs.readFileSync(prettierrcPath, 'utf-8'));
    expect(prettierConfig.semi).toBe(true);
    expect(prettierConfig.singleQuote).toBe(true);
    expect(prettierConfig.tabWidth).toBe(2);
    expect(prettierConfig.printWidth).toBe(100);
    expect(prettierConfig.trailingComma).toBe('es5');
  });

  it('should have required project directories', () => {
    const requiredDirs = [
      'app',
      'components',
      'components/ui',
      'lib',
      'hooks',
      'types',
      'public',
      '__tests__',
    ];

    requiredDirs.forEach(dir => {
      const dirPath = path.join(rootDir, dir);
      expect(fs.existsSync(dirPath)).toBe(true);
    });
  });

  it('should have environment variables example file', () => {
    const envExamplePath = path.join(rootDir, '.env.local.example');
    expect(fs.existsSync(envExamplePath)).toBe(true);
  });

  it('should have shadcn/ui components configuration', () => {
    const componentsJsonPath = path.join(rootDir, 'components.json');
    expect(fs.existsSync(componentsJsonPath)).toBe(true);
    
    const componentsConfig = JSON.parse(fs.readFileSync(componentsJsonPath, 'utf-8'));
    expect(componentsConfig.style).toBe('default');
    expect(componentsConfig.tsx).toBe(true);
    expect(componentsConfig.tailwind.config).toBe('tailwind.config.ts');
  });

  it('should have git hooks configuration', () => {
    const huskyPath = path.join(rootDir, '.husky');
    expect(fs.existsSync(huskyPath)).toBe(true);
    
    const preCommitPath = path.join(huskyPath, 'pre-commit');
    expect(fs.existsSync(preCommitPath)).toBe(true);
  });

  it('should have lint-staged configuration', () => {
    const lintstagedrcPath = path.join(rootDir, '.lintstagedrc');
    expect(fs.existsSync(lintstagedrcPath)).toBe(true);
  });

  it('should have vitest configuration', () => {
    const vitestConfigPath = path.join(rootDir, 'vitest.config.ts');
    expect(fs.existsSync(vitestConfigPath)).toBe(true);
  });
});

describe('Package Configuration', () => {
  const rootDir = process.cwd();

  it('should have correct package.json configuration', () => {
    const packageJsonPath = path.join(rootDir, 'package.json');
    expect(fs.existsSync(packageJsonPath)).toBe(true);
    
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
    
    // Check name
    expect(packageJson.name).toBe('psycheval-ai');
    
    // Check scripts
    expect(packageJson.scripts).toHaveProperty('dev');
    expect(packageJson.scripts).toHaveProperty('build');
    expect(packageJson.scripts).toHaveProperty('start');
    expect(packageJson.scripts).toHaveProperty('lint');
    expect(packageJson.scripts).toHaveProperty('lint:fix');
    expect(packageJson.scripts).toHaveProperty('format');
    expect(packageJson.scripts).toHaveProperty('type-check');
    expect(packageJson.scripts).toHaveProperty('test');
    expect(packageJson.scripts).toHaveProperty('test:coverage');
    expect(packageJson.scripts).toHaveProperty('prepare');
  });
});