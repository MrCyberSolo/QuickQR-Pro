/**
 * SEO Configuration Utility
 * This file provides functions to manage SEO configuration for QuickQR Pro
 */

const fs = require('fs');
const path = require('path');

// Define the path for site configuration
const CONFIG_PATH = path.resolve(__dirname, '../../src/data/siteConfig.json');

/**
 * Get the current SEO configuration
 * @returns {Object} The current SEO configuration
 */
const getSeoConfig = () => {
  try {
    if (!fs.existsSync(CONFIG_PATH)) {
      return createDefaultConfig();
    }
    
    const configData = fs.readFileSync(CONFIG_PATH, 'utf8');
    const config = JSON.parse(configData);
    return config.seo || {};
  } catch (error) {
    console.error('Error reading SEO config:', error);
    return createDefaultConfig().seo;
  }
};

/**
 * Update the SEO configuration
 * @param {Object} seoData - The new SEO configuration data
 * @returns {boolean} Success status
 */
const updateSeoConfig = (seoData) => {
  try {
    let config = {};
    
    if (fs.existsSync(CONFIG_PATH)) {
      const configData = fs.readFileSync(CONFIG_PATH, 'utf8');
      config = JSON.parse(configData);
    } else {
      config = createDefaultConfig();
    }
    
    // Update only the SEO section
    config.seo = { ...config.seo, ...seoData };
    
    // Ensure the directory exists
    const dir = path.dirname(CONFIG_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    // Write the updated config
    fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error updating SEO config:', error);
    return false;
  }
};

/**
 * Create a default configuration
 * @returns {Object} The default configuration
 */
const createDefaultConfig = () => {
  const defaultConfig = {
    "seo": {
      "title": "QuickQR Pro - Easy QR Code Generator",
      "description": "Generate customizable QR codes for URLs, WiFi, vCards, and more with QuickQR Pro. No sign-up required.",
      "keywords": "QR code, QR generator, QR code maker, free QR code, custom QR",
      "ogImage": "/images/og-image.png",
      "twitterCard": "summary_large_image",
      "favicon": "/favicon.ico"
    },
    "branding": {
      "siteName": "QuickQR Pro",
      "logo": "/images/logo.svg",
      "primaryColor": "#4F46E5",
      "secondaryColor": "#818CF8"
    },
    "contact": {
      "email": "support@quickqrpro.com",
      "twitter": "@quickqrpro",
      "github": "quickqrpro"
    },
    "features": {
      "enableAnalytics": true,
      "enableTemplates": true,
      "enableCustomization": true,
      "enableBulkGeneration": false
    }
  };
  
  // Ensure the directory exists
  const dir = path.dirname(CONFIG_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  fs.writeFileSync(CONFIG_PATH, JSON.stringify(defaultConfig, null, 2), 'utf8');
  return defaultConfig;
};

module.exports = {
  getSeoConfig,
  updateSeoConfig
};
