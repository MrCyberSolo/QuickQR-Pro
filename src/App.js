import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import ApiDocs from './pages/ApiDocs';
import Templates from './pages/Templates';
import Analytics from './pages/Analytics';
import ProFeatures from './pages/ProFeatures';

import { FaQrcode, FaCrown, FaChartBar, FaLayerGroup, FaCode, FaBars, FaTimes } from 'react-icons/fa';



function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Import SEO optimizer (client-side version)
  const seoOptimizer = {
    applySeoToDocument: (pageName) => {
      fetch(`/api/seo?page=${pageName}`)
        .then(response => response.json())
        .then(seoMetadata => {
          // Set document title
          document.title = seoMetadata.title || seoMetadata.general.title;
          
          // Update meta description
          let metaDescription = document.querySelector('meta[name="description"]');
          if (!metaDescription) {
            metaDescription = document.createElement('meta');
            metaDescription.name = 'description';
            document.head.appendChild(metaDescription);
          }
          metaDescription.content = seoMetadata.description || seoMetadata.general.description;
          
          // Update meta keywords
          let metaKeywords = document.querySelector('meta[name="keywords"]');
          if (!metaKeywords) {
            metaKeywords = document.createElement('meta');
            metaKeywords.name = 'keywords';
            document.head.appendChild(metaKeywords);
          }
          metaKeywords.content = seoMetadata.keywords || seoMetadata.general.keywords;
          
          // Set canonical URL
          let canonicalLink = document.querySelector('link[rel="canonical"]');
          if (!canonicalLink) {
            canonicalLink = document.createElement('link');
            canonicalLink.rel = 'canonical';
            document.head.appendChild(canonicalLink);
          }
          canonicalLink.href = seoMetadata.canonicalUrl || window.location.href;
          
          // Update favicon
          let faviconLink = document.querySelector('link[rel="icon"]');
          if (!faviconLink) {
            faviconLink = document.createElement('link');
            faviconLink.rel = 'icon';
            document.head.appendChild(faviconLink);
          }
          faviconLink.href = seoMetadata.favicon || seoMetadata.general.favicon;
          
          // Update Open Graph tags
          const og = seoMetadata.openGraph;
          if (og) {
            const ogTags = [
              { property: 'og:title', content: og.title },
              { property: 'og:description', content: og.description },
              { property: 'og:type', content: og.type },
              { property: 'og:image', content: window.location.origin + og.image },
              { property: 'og:image:alt', content: og.imageAlt },
              { property: 'og:image:width', content: og.imageWidth },
              { property: 'og:image:height', content: og.imageHeight },
              { property: 'og:site_name', content: og.siteName },
              { property: 'og:url', content: window.location.href }
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
          }
          
          // Update Twitter Card tags
          const tw = seoMetadata.twitter;
          if (tw) {
            const twitterTags = [
              { name: 'twitter:card', content: tw.card },
              { name: 'twitter:site', content: tw.site },
              { name: 'twitter:creator', content: tw.creator },
              { name: 'twitter:title', content: tw.title },
              { name: 'twitter:description', content: tw.description },
              { name: 'twitter:image', content: window.location.origin + tw.image },
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
          }
          
          // Add structured data
          fetch(`/api/seo/structured-data?page=${pageName}`)
            .then(response => response.text())
            .then(structuredDataScript => {
              if (structuredDataScript) {
                // Remove any existing JSON-LD scripts
                const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
                existingScripts.forEach(script => script.remove());
                
                // Add the new script
                const scriptElement = document.createElement('div');
                scriptElement.innerHTML = structuredDataScript;
                document.head.appendChild(scriptElement.firstChild);
              }
            })
            .catch(error => console.error('Error loading structured data:', error));
          
          // Site configuration is applied via meta tags directly
        })
        .catch(error => console.error('Error applying SEO:', error));
    }
  };
  
  // Apply SEO based on current route
  useEffect(() => {
    // Create the SEO optimizer object inside the effect to avoid dependency issues
    const seoOptimizer = {
      applySeoToDocument: (pageName) => {
        fetch(`/api/seo?page=${pageName}`)
          .then(response => response.json())
          .then(seoMetadata => {
            // Set document title
            document.title = seoMetadata.title || seoMetadata.general.title;
            
            // Update meta description
            let metaDescription = document.querySelector('meta[name="description"]');
            if (!metaDescription) {
              metaDescription = document.createElement('meta');
              metaDescription.name = 'description';
              document.head.appendChild(metaDescription);
            }
            metaDescription.content = seoMetadata.description || seoMetadata.general.description;
            
            // Update meta keywords
            let metaKeywords = document.querySelector('meta[name="keywords"]');
            if (!metaKeywords) {
              metaKeywords = document.createElement('meta');
              metaKeywords.name = 'keywords';
              document.head.appendChild(metaKeywords);
            }
            metaKeywords.content = seoMetadata.keywords || seoMetadata.general.keywords;
            
            // Set canonical URL
            let canonicalLink = document.querySelector('link[rel="canonical"]');
            if (!canonicalLink) {
              canonicalLink = document.createElement('link');
              canonicalLink.rel = 'canonical';
              document.head.appendChild(canonicalLink);
            }
            canonicalLink.href = seoMetadata.canonicalUrl || window.location.href;
            
            // Update favicon
            let faviconLink = document.querySelector('link[rel="icon"]');
            if (!faviconLink) {
              faviconLink = document.createElement('link');
              faviconLink.rel = 'icon';
              document.head.appendChild(faviconLink);
            }
            faviconLink.href = seoMetadata.favicon || seoMetadata.general.favicon;
            
            // Update Open Graph tags
            const og = seoMetadata.openGraph;
            if (og) {
              const ogTags = [
                { property: 'og:title', content: og.title },
                { property: 'og:description', content: og.description },
                { property: 'og:type', content: og.type },
                { property: 'og:image', content: window.location.origin + og.image },
                { property: 'og:image:alt', content: og.imageAlt },
                { property: 'og:image:width', content: og.imageWidth },
                { property: 'og:image:height', content: og.imageHeight },
                { property: 'og:site_name', content: og.siteName },
                { property: 'og:url', content: window.location.href }
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
            }
            
            // Update Twitter Card tags
            const tw = seoMetadata.twitter;
            if (tw) {
              const twitterTags = [
                { name: 'twitter:card', content: tw.card },
                { name: 'twitter:site', content: tw.site },
                { name: 'twitter:creator', content: tw.creator },
                { name: 'twitter:title', content: tw.title },
                { name: 'twitter:description', content: tw.description },
                { name: 'twitter:image', content: window.location.origin + tw.image },
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
            }
            
            // Add structured data
            fetch(`/api/seo/structured-data?page=${pageName}`)
              .then(response => response.text())
              .then(structuredDataScript => {
                if (structuredDataScript) {
                  // Remove any existing JSON-LD scripts
                  const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
                  existingScripts.forEach(script => script.remove());
                  
                  // Add the new script
                  const scriptElement = document.createElement('div');
                  scriptElement.innerHTML = structuredDataScript;
                  document.head.appendChild(scriptElement.firstChild);
                }
              })
              .catch(error => console.error('Error loading structured data:', error));
          })
          .catch(error => console.error('Error applying SEO:', error));
      }
    };
    
    // Get current page from URL path
    const path = window.location.pathname;
    let pageName = 'home';
    
    if (path.startsWith('/templates')) {
      pageName = 'templates';
    } else if (path.startsWith('/analytics')) {
      pageName = 'analytics';
    } else if (path.startsWith('/api-docs')) {
      pageName = 'api-docs';
    } else if (path.startsWith('/pro-features')) {
      pageName = 'pro-features';
    }
    
    // Apply SEO for the current page
    seoOptimizer.applySeoToDocument(pageName);
    
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Navigation */}
        <nav className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <Link to="/" className="text-2xl font-bold text-indigo-600 flex items-center">
                    <FaQrcode className="h-8 w-8 mr-2" />
                    QuickQR Pro
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  <Link
                    to="/"
                    className="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  >
                    Home
                  </Link>
                  <Link
                    to="/templates"
                    className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  >
                    <FaLayerGroup className="mr-1" /> Templates
                  </Link>
                  <Link
                    to="/analytics"
                    className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  >
                    <FaChartBar className="mr-1" /> Analytics
                  </Link>
                  <Link
                    to="/api-docs"
                    className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  >
                    <FaCode className="mr-1" /> API
                  </Link>
                  <Link
                    to="/pro-features"
                    className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  >
                    <FaCrown className="mr-1" /> Pro Features
                  </Link>

                </div>
              </div>

              
              {/* Mobile menu button */}
              <div className="flex items-center sm:hidden">
                <button
                  type="button"
                  onClick={toggleMobileMenu}
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                  aria-expanded="false"
                >
                  <span className="sr-only">Open main menu</span>
                  {isMobileMenuOpen ? (
                    <FaTimes className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <FaBars className="block h-6 w-6" aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>
          </div>
          
          {/* Mobile menu, show/hide based on menu state */}
          <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} sm:hidden`}>
            <div className="pt-2 pb-3 space-y-1">
              <Link
                to="/"
                className="bg-indigo-50 border-indigo-500 text-indigo-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/templates"
                className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <FaLayerGroup className="inline-block mr-2" /> Templates
              </Link>
              <Link
                to="/analytics"
                className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <FaChartBar className="inline-block mr-2" /> Analytics
              </Link>
              <Link
                to="/api-docs"
                className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <FaCode className="inline-block mr-2" /> API
              </Link>
              <Link
                to="/pro-features"
                className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <FaCrown className="inline-block mr-2" /> Pro Features
              </Link>

            </div>

          </div>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pro-features" element={<ProFeatures />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/api-docs" element={<ApiDocs />} />

        </Routes>

        {/* Footer */}
        <footer className="bg-white">
          <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
            <nav className="-mx-5 -my-2 flex flex-wrap justify-center" aria-label="Footer">
              <div className="px-5 py-2">
                <Link to="/" className="text-base text-gray-500 hover:text-gray-900">
                  Home
                </Link>
              </div>
              <div className="px-5 py-2">
                <Link to="/templates" className="text-base text-gray-500 hover:text-gray-900">
                  Templates
                </Link>
              </div>
              <div className="px-5 py-2">
                <Link to="/analytics" className="text-base text-gray-500 hover:text-gray-900">
                  Analytics
                </Link>
              </div>
              <div className="px-5 py-2">
                <Link to="/api-docs" className="text-base text-gray-500 hover:text-gray-900">
                  API Docs
                </Link>
              </div>
              <div className="px-5 py-2">
                <Link to="/pro-features" className="text-base text-gray-500 hover:text-gray-900">
                  Pro Features
                </Link>
              </div>
            </nav>
            <p className="mt-8 text-center text-base text-gray-400">
              &copy; 2025 QuickQR Pro. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
