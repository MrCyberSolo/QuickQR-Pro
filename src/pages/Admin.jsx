import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCog, FaSave, FaImage, FaGlobe, FaPalette, FaEnvelope, FaToggleOn, FaSignOutAlt } from 'react-icons/fa';

const Admin = () => {
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('seo');
  const [message, setMessage] = useState({ type: '', text: '' });
  const [faviconFile, setFaviconFile] = useState(null);
  const [faviconPreview, setFaviconPreview] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Check authentication
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      console.log('No token found, redirecting to login');
      navigate('/admin-login');
      return;
    }
    
    // First check if API is accessible
    const checkApiAccess = async () => {
      try {
        // Test API endpoint that doesn't require authentication
        const testResponse = await fetch('http://api.dynamic-balancig.com/api/admin/test');
        
        if (!testResponse.ok) {
          console.error('API server not accessible');
          setMessage({ type: 'error', text: 'API server not accessible. Please ensure the server is running.' });
          return false;
        }
        
        return true;
      } catch (error) {
        console.error('API access error:', error);
        setMessage({ type: 'error', text: 'Cannot connect to API server: ' + error.message });
        return false;
      }
    };
    
    // Verify token with the server
    const verifyToken = async () => {
      // First check if API is accessible
      const apiAccessible = await checkApiAccess();
      if (!apiAccessible) return;
      
      try {
        console.log('Verifying token with server');
        const response = await fetch('http://api.dynamic-balancig.com/api/admin/verify', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        console.log('Token verification response status:', response.status);
        
        if (response.ok) {
          const data = await response.json();
          console.log('Token verified successfully:', data);
          setAuthenticated(true);
        } else {
          console.log('Token invalid, redirecting to login');
          // Token invalid, redirect to login
          localStorage.removeItem('adminToken');
          navigate('/admin-login');
        }
      } catch (error) {
        console.error('Token verification error:', error);
        setMessage({ type: 'error', text: 'Authentication error: ' + error.message });
        navigate('/admin-login');
      }
    };
    
    verifyToken();
  }, [navigate]);

  // Fetch the current configuration
  useEffect(() => {
    if (!authenticated) return;
    
    const fetchConfig = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        console.log('Using token for config fetch:', token ? 'Token exists' : 'No token');
        
        if (!token) {
          console.error('No token available for config fetch');
          setMessage({ type: 'error', text: 'Authentication token missing. Please log in again.' });
          navigate('/admin-login');
          return;
        }
        
        const response = await fetch('http://api.dynamic-balancig.com/api/admin/config', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        console.log('Config fetch response status:', response.status);
        if (response.ok) {
          const data = await response.json();
          setConfig(data);
        } else {
          setMessage({ type: 'error', text: 'Failed to load configuration' });
        }
      } catch (error) {
        setMessage({ type: 'error', text: 'Error: ' + error.message });
      } finally {
        setLoading(false);
      }
    };

    fetchConfig();
  }, [authenticated, navigate]);

  // Handle form input changes
  const handleInputChange = (section, field, value) => {
    setConfig({
      ...config,
      [section]: {
        ...config[section],
        [field]: value
      }
    });
  };

  // Handle feature toggle changes
  const handleToggleChange = (feature) => {
    setConfig({
      ...config,
      features: {
        ...config.features,
        [feature]: !config.features[feature]
      }
    });
  };

  // Handle favicon file selection
  const handleFaviconChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFaviconFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setFaviconPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin-login');
  };

  // Save configuration changes
  const saveConfig = async () => {
    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      // Create form data for file upload
      const formData = new FormData();
      formData.append('config', JSON.stringify(config));
      if (faviconFile) {
        formData.append('favicon', faviconFile);
      }

      const token = localStorage.getItem('adminToken');
      const response = await fetch('http://api.dynamic-balancig.com/api/admin/config', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Configuration saved successfully!' });
        // Reset favicon file after successful upload
        setFaviconFile(null);
      } else {
        const error = await response.json();
        setMessage({ type: 'error', text: error.message || 'Failed to save configuration' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Error: ' + error.message });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-xl">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center">
          <FaCog className="mr-3 h-8 w-8 text-indigo-600" />
          Admin Panel
        </h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={handleLogout}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <FaSignOutAlt className="mr-2 -ml-1 h-5 w-5 text-gray-500" />
            Logout
          </button>
        </div>
        <button
          onClick={saveConfig}
          disabled={saving}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {saving ? (
            <>
              <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
              Saving...
            </>
          ) : (
            <>
              <FaSave className="mr-2 -ml-1 h-5 w-5" />
              Save Changes
            </>
          )}
        </button>
      </div>

      {message.text && (
        <div className={`mb-6 p-4 rounded-md ${message.type === 'error' ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
          {message.text}
        </div>
      )}

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('seo')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === 'seo'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <FaGlobe className="inline-block mr-2" />
              SEO & Favicon
            </button>
            <button
              onClick={() => setActiveTab('branding')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === 'branding'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <FaPalette className="inline-block mr-2" />
              Branding
            </button>
            <button
              onClick={() => setActiveTab('contact')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === 'contact'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <FaEnvelope className="inline-block mr-2" />
              Contact Info
            </button>
            <button
              onClick={() => setActiveTab('features')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === 'features'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <FaToggleOn className="inline-block mr-2" />
              Features
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'seo' && config && (
            <div className="space-y-6">
              <h2 className="text-xl font-medium text-gray-900">SEO Settings</h2>
              
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="seo-title" className="block text-sm font-medium text-gray-700">
                    Site Title
                  </label>
                  <input
                    type="text"
                    id="seo-title"
                    value={config.seo.title}
                    onChange={(e) => handleInputChange('seo', 'title', e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                
                <div className="sm:col-span-2">
                  <label htmlFor="seo-description" className="block text-sm font-medium text-gray-700">
                    Meta Description
                  </label>
                  <textarea
                    id="seo-description"
                    value={config.seo.description}
                    onChange={(e) => handleInputChange('seo', 'description', e.target.value)}
                    rows={3}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Brief description of your site (150-160 characters recommended)
                  </p>
                </div>
                
                <div className="sm:col-span-2">
                  <label htmlFor="seo-keywords" className="block text-sm font-medium text-gray-700">
                    Meta Keywords
                  </label>
                  <input
                    type="text"
                    id="seo-keywords"
                    value={config.seo.keywords}
                    onChange={(e) => handleInputChange('seo', 'keywords', e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Comma-separated keywords
                  </p>
                </div>
                
                <div>
                  <label htmlFor="seo-ogImage" className="block text-sm font-medium text-gray-700">
                    OG Image Path
                  </label>
                  <input
                    type="text"
                    id="seo-ogImage"
                    value={config.seo.ogImage}
                    onChange={(e) => handleInputChange('seo', 'ogImage', e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                
                <div>
                  <label htmlFor="seo-twitterCard" className="block text-sm font-medium text-gray-700">
                    Twitter Card Type
                  </label>
                  <select
                    id="seo-twitterCard"
                    value={config.seo.twitterCard}
                    onChange={(e) => handleInputChange('seo', 'twitterCard', e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="summary">Summary</option>
                    <option value="summary_large_image">Summary with Large Image</option>
                    <option value="app">App</option>
                    <option value="player">Player</option>
                  </select>
                </div>
              </div>
              
              <div className="pt-5 border-t border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Favicon</h3>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="h-16 w-16 border border-gray-300 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center">
                      {faviconPreview ? (
                        <img src={faviconPreview} alt="Favicon preview" className="h-full w-full object-contain" />
                      ) : (
                        <img 
                          src={`${process.env.PUBLIC_URL}${config.seo.favicon}`} 
                          alt="Current favicon" 
                          className="h-full w-full object-contain"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><circle cx="12" cy="12" r="3"></circle></svg>';
                          }}
                        />
                      )}
                    </div>
                  </div>
                  
                  <div className="flex-grow">
                    <label htmlFor="favicon-upload" className="block text-sm font-medium text-gray-700">
                      Upload New Favicon
                    </label>
                    <div className="mt-1 flex items-center">
                      <input
                        id="favicon-upload"
                        name="favicon-upload"
                        type="file"
                        accept=".ico,.png,.svg"
                        onChange={handleFaviconChange}
                        className="sr-only"
                      />
                      <label
                        htmlFor="favicon-upload"
                        className="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        <FaImage className="inline-block mr-2" />
                        Choose File
                      </label>
                      <span className="ml-3 text-sm text-gray-500">
                        {faviconFile ? faviconFile.name : 'No file chosen'}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      Recommended formats: .ico, .png, or .svg. Optimal size: 32x32px or 64x64px.
                    </p>
                  </div>
                </div>
                
                <div className="mt-4">
                  <label htmlFor="seo-favicon" className="block text-sm font-medium text-gray-700">
                    Favicon Path
                  </label>
                  <input
                    type="text"
                    id="seo-favicon"
                    value={config.seo.favicon}
                    onChange={(e) => handleInputChange('seo', 'favicon', e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Path to the favicon file (e.g., /favicon.ico)
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'branding' && config && (
            <div className="space-y-6">
              <h2 className="text-xl font-medium text-gray-900">Branding Settings</h2>
              
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="branding-siteName" className="block text-sm font-medium text-gray-700">
                    Site Name
                  </label>
                  <input
                    type="text"
                    id="branding-siteName"
                    value={config.branding.siteName}
                    onChange={(e) => handleInputChange('branding', 'siteName', e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                
                <div>
                  <label htmlFor="branding-logo" className="block text-sm font-medium text-gray-700">
                    Logo Path
                  </label>
                  <input
                    type="text"
                    id="branding-logo"
                    value={config.branding.logo}
                    onChange={(e) => handleInputChange('branding', 'logo', e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                
                <div>
                  <label htmlFor="branding-primaryColor" className="block text-sm font-medium text-gray-700">
                    Primary Color
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: config.branding.primaryColor }}
                      ></div>
                    </span>
                    <input
                      type="text"
                      id="branding-primaryColor"
                      value={config.branding.primaryColor}
                      onChange={(e) => handleInputChange('branding', 'primaryColor', e.target.value)}
                      className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300"
                      placeholder="#4F46E5"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="branding-secondaryColor" className="block text-sm font-medium text-gray-700">
                    Secondary Color
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: config.branding.secondaryColor }}
                      ></div>
                    </span>
                    <input
                      type="text"
                      id="branding-secondaryColor"
                      value={config.branding.secondaryColor}
                      onChange={(e) => handleInputChange('branding', 'secondaryColor', e.target.value)}
                      className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300"
                      placeholder="#818CF8"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'contact' && config && (
            <div className="space-y-6">
              <h2 className="text-xl font-medium text-gray-900">Contact Information</h2>
              
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700">
                    Support Email
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    value={config.contact.email}
                    onChange={(e) => handleInputChange('contact', 'email', e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                
                <div>
                  <label htmlFor="contact-twitter" className="block text-sm font-medium text-gray-700">
                    Twitter Handle
                  </label>
                  <input
                    type="text"
                    id="contact-twitter"
                    value={config.contact.twitter}
                    onChange={(e) => handleInputChange('contact', 'twitter', e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                
                <div>
                  <label htmlFor="contact-github" className="block text-sm font-medium text-gray-700">
                    GitHub Username
                  </label>
                  <input
                    type="text"
                    id="contact-github"
                    value={config.contact.github}
                    onChange={(e) => handleInputChange('contact', 'github', e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'features' && config && (
            <div className="space-y-6">
              <h2 className="text-xl font-medium text-gray-900">Feature Toggles</h2>
              
              <div className="space-y-4">
                <div className="relative flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="features-enableAnalytics"
                      type="checkbox"
                      checked={config.features.enableAnalytics}
                      onChange={() => handleToggleChange('enableAnalytics')}
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="features-enableAnalytics" className="font-medium text-gray-700">
                      Enable Analytics
                    </label>
                    <p className="text-gray-500">Show analytics dashboard and collect QR code scan data</p>
                  </div>
                </div>
                
                <div className="relative flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="features-enableTemplates"
                      type="checkbox"
                      checked={config.features.enableTemplates}
                      onChange={() => handleToggleChange('enableTemplates')}
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="features-enableTemplates" className="font-medium text-gray-700">
                      Enable Templates
                    </label>
                    <p className="text-gray-500">Show the templates page for predefined QR code types</p>
                  </div>
                </div>
                
                <div className="relative flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="features-enableCustomization"
                      type="checkbox"
                      checked={config.features.enableCustomization}
                      onChange={() => handleToggleChange('enableCustomization')}
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="features-enableCustomization" className="font-medium text-gray-700">
                      Enable Customization
                    </label>
                    <p className="text-gray-500">Allow users to customize QR code appearance</p>
                  </div>
                </div>
                
                <div className="relative flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="features-enableBulkGeneration"
                      type="checkbox"
                      checked={config.features.enableBulkGeneration}
                      onChange={() => handleToggleChange('enableBulkGeneration')}
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="features-enableBulkGeneration" className="font-medium text-gray-700">
                      Enable Bulk Generation
                    </label>
                    <p className="text-gray-500">Allow users to generate multiple QR codes at once</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
