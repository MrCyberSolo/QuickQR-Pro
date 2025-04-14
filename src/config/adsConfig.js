/**
 * Google AdSense Configuration
 * 
 * This file contains all the Google AdSense configuration settings.
 * Update these values with your actual AdSense publisher ID and ad slot IDs.
 */

const adsConfig = {
  // Publisher ID
  publisherId: 'ca-pub-9652810658562122',
  
  // Ad Units
  adUnits: {
    // Home page banner ad
    homeBanner: {
      slot: 'XXXXXXXXXX',
      format: 'auto',
      responsive: true,
      style: { display: 'block', textAlign: 'center' }
    },
    
    // Templates page sidebar ad
    templatesSidebar: {
      slot: 'XXXXXXXXXX',
      format: 'auto',
      responsive: true,
      style: { display: 'block', minHeight: '280px' }
    },
    
    // API docs page ad
    apiDocsFooter: {
      slot: 'XXXXXXXXXX',
      format: 'auto',
      responsive: true,
      style: { display: 'block', textAlign: 'center', margin: '20px 0' }
    },
    
    // Analytics page ad
    analyticsInline: {
      slot: 'XXXXXXXXXX',
      format: 'auto',
      responsive: true,
      style: { display: 'block', margin: '20px auto' }
    }
  },
  
  // Global settings
  settings: {
    enabled: true,  // Set to false to disable all ads globally
    testMode: true  // Set to true during development, false in production
  }
};

export default adsConfig;
