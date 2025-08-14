#!/usr/bin/env node

/**
 * SEO Validation Script for Elanchezhiyan P Portfolio
 * 
 * This script performs basic SEO checks on the website
 * Run with: node scripts/seo-check.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// SEO validation functions
const seoChecks = {
  // Check if sitemap exists
  checkSitemap: () => {
    const sitemapPath = path.join(__dirname, '../public/sitemap.xml');
    if (fs.existsSync(sitemapPath)) {
      console.log('✅ Sitemap.xml exists');
      return true;
    } else {
      console.log('❌ Sitemap.xml missing');
      return false;
    }
  },

  // Check if robots.txt exists
  checkRobotsTxt: () => {
    const robotsPath = path.join(__dirname, '../public/robots.txt');
    if (fs.existsSync(robotsPath)) {
      console.log('✅ Robots.txt exists');
      return true;
    } else {
      console.log('❌ Robots.txt missing');
      return false;
    }
  },

  // Check if manifest.json exists
  checkManifest: () => {
    const manifestPath = path.join(__dirname, '../public/manifest.json');
    if (fs.existsSync(manifestPath)) {
      console.log('✅ Manifest.json exists');
      return true;
    } else {
      console.log('❌ Manifest.json missing');
      return false;
    }
  },

  // Check if favicon files exist
  checkFavicons: () => {
    const faviconFiles = [
      'favicon.ico',
      'favicon-16x16.png',
      'favicon-32x32.png',
      'apple-touch-icon.png',
      'android-chrome-192x192.png',
      'android-chrome-512x512.png'
    ];

    const publicDir = path.join(__dirname, '../public');
    let allExist = true;

    faviconFiles.forEach(file => {
      const filePath = path.join(publicDir, file);
      if (fs.existsSync(filePath)) {
        console.log(`✅ ${file} exists`);
      } else {
        console.log(`❌ ${file} missing`);
        allExist = false;
      }
    });

    return allExist;
  },

  // Check if SEO components exist
  checkSEOComponents: () => {
    const seoFiles = [
      '../src/components/SEOHead.tsx',
      '../src/utils/seoUtils.ts'
    ];

    let allExist = true;

    seoFiles.forEach(file => {
      const filePath = path.join(__dirname, file);
      if (fs.existsSync(filePath)) {
        console.log(`✅ ${file} exists`);
      } else {
        console.log(`❌ ${file} missing`);
        allExist = false;
      }
    });

    return allExist;
  },

  // Check if index.html has proper meta tags
  checkIndexHTML: () => {
    const indexPath = path.join(__dirname, '../index.html');
    if (!fs.existsSync(indexPath)) {
      console.log('❌ index.html missing');
      return false;
    }

    const content = fs.readFileSync(indexPath, 'utf8');
    const checks = [
      { name: 'Title tag', pattern: /<title>.*<\/title>/ },
      { name: 'Meta description', pattern: /<meta name="description"/ },
      { name: 'Meta keywords', pattern: /<meta name="keywords"/ },
      { name: 'Open Graph tags', pattern: /<meta property="og:/ },
      { name: 'Twitter Card tags', pattern: /<meta name="twitter:/ },
      { name: 'Canonical URL', pattern: /<link rel="canonical"/ },
      { name: 'Structured data', pattern: /<script type="application\/ld\+json">/ },
      { name: 'Viewport meta', pattern: /<meta name="viewport"/ },
      { name: 'Charset meta', pattern: /<meta charset="UTF-8"/ }
    ];

    let allPass = true;

    checks.forEach(check => {
      if (check.pattern.test(content)) {
        console.log(`✅ ${check.name} found`);
      } else {
        console.log(`❌ ${check.name} missing`);
        allPass = false;
      }
    });

    return allPass;
  },

  // Check package.json for SEO-related dependencies
  checkDependencies: () => {
    const packagePath = path.join(__dirname, '../package.json');
    if (!fs.existsSync(packagePath)) {
      console.log('❌ package.json missing');
      return false;
    }

    const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    const seoDependencies = ['react-helmet-async'];
    
    let allExist = true;

    seoDependencies.forEach(dep => {
      if (packageJson.dependencies && packageJson.dependencies[dep]) {
        console.log(`✅ ${dep} dependency found`);
      } else {
        console.log(`❌ ${dep} dependency missing`);
        allExist = false;
      }
    });

    return allExist;
  }
};

// Main validation function
const runSEOValidation = () => {
  console.log('🔍 Starting SEO Validation...\n');
  
  const results = {
    sitemap: seoChecks.checkSitemap(),
    robots: seoChecks.checkRobotsTxt(),
    manifest: seoChecks.checkManifest(),
    favicons: seoChecks.checkFavicons(),
    components: seoChecks.checkSEOComponents(),
    indexHTML: seoChecks.checkIndexHTML(),
    dependencies: seoChecks.checkDependencies()
  };

  console.log('\n📊 SEO Validation Results:');
  console.log('========================');
  
  const totalChecks = Object.keys(results).length;
  const passedChecks = Object.values(results).filter(Boolean).length;
  const failedChecks = totalChecks - passedChecks;

  console.log(`Total checks: ${totalChecks}`);
  console.log(`Passed: ${passedChecks}`);
  console.log(`Failed: ${failedChecks}`);
  console.log(`Success rate: ${Math.round((passedChecks / totalChecks) * 100)}%`);

  if (failedChecks === 0) {
    console.log('\n🎉 All SEO checks passed! Your website is well-optimized for search engines.');
  } else {
    console.log('\n⚠️  Some SEO checks failed. Please review the issues above.');
  }

  // Additional recommendations
  console.log('\n💡 SEO Recommendations:');
  console.log('=======================');
  console.log('1. Submit your sitemap to Google Search Console');
  console.log('2. Set up Google Analytics for traffic monitoring');
  console.log('3. Test your website with Google PageSpeed Insights');
  console.log('4. Validate structured data with Google Rich Results Test');
  console.log('5. Monitor Core Web Vitals in Google Search Console');
  console.log('6. Regularly update content and check for broken links');
  console.log('7. Consider implementing hreflang if targeting multiple regions');
  console.log('8. Optimize images and implement lazy loading');
  console.log('9. Set up Google My Business for local SEO');
  console.log('10. Create and maintain a blog for content marketing');
};

// Run the validation
runSEOValidation();
