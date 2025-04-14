/**
 * SEO Optimizer Utility
 * Provides functions to load and apply optimized SEO settings from JSON configuration
 */

const fs = require('fs');
const path = require('path');

// Path to the SEO configuration file
const SEO_CONFIG_PATH = path.resolve(__dirname, '../data/seo.json');

/**
 * Load the SEO configuration from the JSON file
 * @returns {Object} The SEO configuration object
 */
const loadSeoConfig = () => {
  try {
    if (!fs.existsSync(SEO_CONFIG_PATH)) {
      console.error('SEO configuration file not found:', SEO_CONFIG_PATH);
      return null;
    }
    
    const seoData = fs.readFileSync(SEO_CONFIG_PATH, 'utf8');
    return JSON.parse(seoData);
  } catch (error) {
    console.error('Error loading SEO configuration:', error);
    return null;
  }
};

/**
 * Get SEO metadata for a specific page
 * @param {string} pageName - The name of the page (e.g., 'home', 'templates')
 * @returns {Object} Combined SEO metadata for the page
 */
const getPageSeoMetadata = (pageName) => {
  const seoConfig = loadSeoConfig();
  if (!seoConfig) return null;
  
  // Get general SEO settings
  const { general, openGraph, twitter } = seoConfig;
  
  // Get page-specific settings if available
  const pageConfig = seoConfig.pages && seoConfig.pages[pageName];
  
  // Combine general and page-specific settings, with page-specific taking precedence
  return {
    title: pageConfig?.title || general.title,
    description: pageConfig?.description || general.description,
    keywords: pageConfig?.keywords || general.keywords,
    language: general.language,
    canonicalUrl: general.canonicalUrl,
    favicon: general.favicon,
    openGraph: {
      title: pageConfig?.title || openGraph.title,
      description: pageConfig?.description || openGraph.description,
      type: openGraph.type,
      image: openGraph.image,
      imageAlt: openGraph.imageAlt,
      imageWidth: openGraph.imageWidth,
      imageHeight: openGraph.imageHeight,
      siteName: openGraph.siteName
    },
    twitter: {
      card: twitter.card,
      site: twitter.site,
      creator: twitter.creator,
      title: pageConfig?.title || twitter.title,
      description: pageConfig?.description || twitter.description,
      image: twitter.image,
      imageAlt: twitter.imageAlt
    },
    structuredData: seoConfig.structuredData,
    advanced: seoConfig.advanced,
    performance: seoConfig.performance
  };
};

/**
 * Generate structured data JSON-LD script content
 * @param {Object} structuredData - The structured data object
 * @returns {string} JSON-LD script content
 */
const generateStructuredDataScript = (structuredData) => {
  if (!structuredData) return '';
  
  const jsonLD = {
    "@context": "https://schema.org",
    ...structuredData
  };
  
  return `<script type="application/ld+json">${JSON.stringify(jsonLD)}</script>`;
};

/**
 * Generate HTML meta tags for SEO
 * @param {Object} seoMetadata - The SEO metadata object
 * @returns {string} HTML meta tags
 */
const generateMetaTags = (seoMetadata) => {
  if (!seoMetadata) return '';
  
  let metaTags = '';
  
  // Basic meta tags
  metaTags += `<title>${seoMetadata.title}</title>\n`;
  metaTags += `<meta name="description" content="${seoMetadata.description}">\n`;
  metaTags += `<meta name="keywords" content="${seoMetadata.keywords}">\n`;
  metaTags += `<meta name="language" content="${seoMetadata.language}">\n`;
  metaTags += `<link rel="canonical" href="${seoMetadata.canonicalUrl}">\n`;
  metaTags += `<link rel="icon" href="${seoMetadata.favicon}">\n`;
  
  // Open Graph tags
  const og = seoMetadata.openGraph;
  metaTags += `<meta property="og:title" content="${og.title}">\n`;
  metaTags += `<meta property="og:description" content="${og.description}">\n`;
  metaTags += `<meta property="og:type" content="${og.type}">\n`;
  metaTags += `<meta property="og:image" content="${og.image}">\n`;
  metaTags += `<meta property="og:image:alt" content="${og.imageAlt}">\n`;
  metaTags += `<meta property="og:image:width" content="${og.imageWidth}">\n`;
  metaTags += `<meta property="og:image:height" content="${og.imageHeight}">\n`;
  metaTags += `<meta property="og:site_name" content="${og.siteName}">\n`;
  
  // Twitter Card tags
  const tw = seoMetadata.twitter;
  metaTags += `<meta name="twitter:card" content="${tw.card}">\n`;
  metaTags += `<meta name="twitter:site" content="${tw.site}">\n`;
  metaTags += `<meta name="twitter:creator" content="${tw.creator}">\n`;
  metaTags += `<meta name="twitter:title" content="${tw.title}">\n`;
  metaTags += `<meta name="twitter:description" content="${tw.description}">\n`;
  metaTags += `<meta name="twitter:image" content="${tw.image}">\n`;
  metaTags += `<meta name="twitter:image:alt" content="${tw.imageAlt}">\n`;
  
  // Advanced settings
  const adv = seoMetadata.advanced;
  metaTags += `<meta name="robots" content="${adv.robots}">\n`;
  
  if (adv.googleSiteVerification) {
    metaTags += `<meta name="google-site-verification" content="${adv.googleSiteVerification}">\n`;
  }
  
  if (adv.bingSiteVerification) {
    metaTags += `<meta name="msvalidate.01" content="${adv.bingSiteVerification}">\n`;
  }
  
  if (adv.yandexVerification) {
    metaTags += `<meta name="yandex-verification" content="${adv.yandexVerification}">\n`;
  }
  
  if (adv.pinterestVerification) {
    metaTags += `<meta name="p:domain_verify" content="${adv.pinterestVerification}">\n`;
  }
  
  // Alternate languages
  if (adv.alternateLanguages && adv.alternateLanguages.length > 0) {
    adv.alternateLanguages.forEach(lang => {
      metaTags += `<link rel="alternate" hreflang="${lang.hreflang}" href="${lang.href}">\n`;
    });
  }
  
  // Custom head tags
  if (adv.customHeadTags && adv.customHeadTags.length > 0) {
    adv.customHeadTags.forEach(tag => {
      metaTags += `${tag}\n`;
    });
  }
  
  // Performance optimizations
  const perf = seoMetadata.performance;
  
  // Preconnect
  if (perf.preconnect && perf.preconnect.length > 0) {
    perf.preconnect.forEach(url => {
      metaTags += `<link rel="preconnect" href="${url}">\n`;
    });
  }
  
  // Preload
  if (perf.preload && perf.preload.length > 0) {
    perf.preload.forEach(item => {
      let preloadTag = `<link rel="preload" href="${item.href}" as="${item.as}"`;
      
      if (item.type) preloadTag += ` type="${item.type}"`;
      if (item.crossorigin) preloadTag += ` crossorigin`;
      
      preloadTag += '>\n';
      metaTags += preloadTag;
    });
  }
  
  return metaTags;
};

/**
 * Apply SEO metadata to the document
 * @param {string} pageName - The name of the page
 */
const applySeoToDocument = (pageName) => {
  // This function is meant to be used in the browser
  if (typeof document === 'undefined') return;
  
  const seoMetadata = getPageSeoMetadata(pageName);
  if (!seoMetadata) return;
  
  // Set document title
  document.title = seoMetadata.title;
  
  // Update meta description
  let metaDescription = document.querySelector('meta[name="description"]');
  if (!metaDescription) {
    metaDescription = document.createElement('meta');
    metaDescription.name = 'description';
    document.head.appendChild(metaDescription);
  }
  metaDescription.content = seoMetadata.description;
  
  // Update meta keywords
  let metaKeywords = document.querySelector('meta[name="keywords"]');
  if (!metaKeywords) {
    metaKeywords = document.createElement('meta');
    metaKeywords.name = 'keywords';
    document.head.appendChild(metaKeywords);
  }
  metaKeywords.content = seoMetadata.keywords;
  
  // Set canonical URL
  let canonicalLink = document.querySelector('link[rel="canonical"]');
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.rel = 'canonical';
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.href = seoMetadata.canonicalUrl;
  
  // Update favicon
  let faviconLink = document.querySelector('link[rel="icon"]');
  if (!faviconLink) {
    faviconLink = document.createElement('link');
    faviconLink.rel = 'icon';
    document.head.appendChild(faviconLink);
  }
  faviconLink.href = seoMetadata.favicon;
  
  // Update Open Graph tags
  const og = seoMetadata.openGraph;
  const ogTags = [
    { property: 'og:title', content: og.title },
    { property: 'og:description', content: og.description },
    { property: 'og:type', content: og.type },
    { property: 'og:image', content: og.image },
    { property: 'og:image:alt', content: og.imageAlt },
    { property: 'og:image:width', content: og.imageWidth },
    { property: 'og:image:height', content: og.imageHeight },
    { property: 'og:site_name', content: og.siteName }
  ];
  
  ogTags.forEach(tag => {
    let metaTag = document.querySelector(`meta[property="${tag.property}"]`);
    if (!metaTag) {
      metaTag = document.createElement('meta');
      metaTag.setAttribute('property', tag.property);
      document.head.appendChild(metaTag);
    }
    metaTag.content = tag.content;
  });
  
  // Update Twitter Card tags
  const tw = seoMetadata.twitter;
  const twitterTags = [
    { name: 'twitter:card', content: tw.card },
    { name: 'twitter:site', content: tw.site },
    { name: 'twitter:creator', content: tw.creator },
    { name: 'twitter:title', content: tw.title },
    { name: 'twitter:description', content: tw.description },
    { name: 'twitter:image', content: tw.image },
    { name: 'twitter:image:alt', content: tw.imageAlt }
  ];
  
  twitterTags.forEach(tag => {
    let metaTag = document.querySelector(`meta[name="${tag.name}"]`);
    if (!metaTag) {
      metaTag = document.createElement('meta');
      metaTag.setAttribute('name', tag.name);
      document.head.appendChild(metaTag);
    }
    metaTag.content = tag.content;
  });
  
  // Add structured data
  const structuredDataScript = generateStructuredDataScript(seoMetadata.structuredData);
  if (structuredDataScript) {
    // Remove any existing JSON-LD scripts
    const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
    existingScripts.forEach(script => script.remove());
    
    // Add the new script
    const scriptElement = document.createElement('div');
    scriptElement.innerHTML = structuredDataScript;
    document.head.appendChild(scriptElement.firstChild);
  }
  
  // Apply advanced settings
  const adv = seoMetadata.advanced;
  
  // Robots
  let robotsTag = document.querySelector('meta[name="robots"]');
  if (!robotsTag) {
    robotsTag = document.createElement('meta');
    robotsTag.name = 'robots';
    document.head.appendChild(robotsTag);
  }
  robotsTag.content = adv.robots;
  
  // Site verifications
  const verifications = [
    { name: 'google-site-verification', content: adv.googleSiteVerification },
    { name: 'msvalidate.01', content: adv.bingSiteVerification },
    { name: 'yandex-verification', content: adv.yandexVerification },
    { name: 'p:domain_verify', content: adv.pinterestVerification }
  ];
  
  verifications.forEach(v => {
    if (v.content) {
      let metaTag = document.querySelector(`meta[name="${v.name}"]`);
      if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.name = v.name;
        document.head.appendChild(metaTag);
      }
      metaTag.content = v.content;
    }
  });
  
  // Alternate languages
  if (adv.alternateLanguages && adv.alternateLanguages.length > 0) {
    // Remove existing alternate language links
    const existingAlternates = document.querySelectorAll('link[rel="alternate"][hreflang]');
    existingAlternates.forEach(link => link.remove());
    
    // Add new alternate language links
    adv.alternateLanguages.forEach(lang => {
      const link = document.createElement('link');
      link.rel = 'alternate';
      link.setAttribute('hreflang', lang.hreflang);
      link.href = lang.href;
      document.head.appendChild(link);
    });
  }
  
  // Custom head tags
  if (adv.customHeadTags && adv.customHeadTags.length > 0) {
    // Create a temporary div to parse the HTML
    const tempDiv = document.createElement('div');
    
    adv.customHeadTags.forEach(tag => {
      tempDiv.innerHTML = tag;
      const element = tempDiv.firstChild;
      
      // Check if a similar element already exists
      let selector = '';
      if (element.tagName === 'META') {
        selector = `meta[name="${element.getAttribute('name')}"]`;
      } else if (element.tagName === 'LINK') {
        selector = `link[rel="${element.getAttribute('rel')}"]`;
      }
      
      if (selector) {
        const existing = document.querySelector(selector);
        if (existing) existing.remove();
      }
      
      document.head.appendChild(element.cloneNode(true));
    });
  }
  
  // Performance optimizations
  const perf = seoMetadata.performance;
  
  // Preconnect
  if (perf.preconnect && perf.preconnect.length > 0) {
    // Remove existing preconnect links
    const existingPreconnects = document.querySelectorAll('link[rel="preconnect"]');
    existingPreconnects.forEach(link => link.remove());
    
    // Add new preconnect links
    perf.preconnect.forEach(url => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = url;
      document.head.appendChild(link);
    });
  }
  
  // Preload
  if (perf.preload && perf.preload.length > 0) {
    // Remove existing preload links
    const existingPreloads = document.querySelectorAll('link[rel="preload"]');
    existingPreloads.forEach(link => link.remove());
    
    // Add new preload links
    perf.preload.forEach(item => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = item.href;
      link.setAttribute('as', item.as);
      
      if (item.type) link.type = item.type;
      if (item.crossorigin) link.crossOrigin = 'anonymous';
      
      document.head.appendChild(link);
    });
  }
};

// Export functions for use in both Node.js and browser environments
module.exports = {
  loadSeoConfig,
  getPageSeoMetadata,
  generateMetaTags,
  generateStructuredDataScript,
  applySeoToDocument
};
