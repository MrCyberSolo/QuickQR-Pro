import React, { useState } from 'react';
import QRForm from '../components/QRForm';
import QRPreview from '../components/QRPreview';
import CustomizationPanel from '../components/CustomizationPanel';
import GoogleAdsense from '../components/GoogleAdsense';
import { FaQrcode, FaArrowRight, FaMagic, FaCrown } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Home = () => {
  const [qrData, setQrData] = useState('https://example.com');
  const [qrType, setQrType] = useState('url');

  // Handle QR data change from form
  const handleQRDataChange = (data, type) => {
    setQrData(data);
    setQrType(type);
  };

  // Handle customization options change
  const handleCustomizationChange = (options) => {
    // In a real implementation, we would update state and pass these options to the QRPreview component
    console.log('Customization options updated:', options);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
          QuickQR <span className="text-indigo-600">Pro</span>
        </h1>
        <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
          Create beautiful, customizable QR codes for any purpose in seconds.
        </p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left Column - QR Form */}
        <div className="lg:col-span-1">
          <div className="bg-white shadow overflow-hidden rounded-lg mb-8">
            <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
                <FaQrcode className="mr-2" /> QR Code Content
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Choose a type and enter your content
              </p>
            </div>
            <QRForm onQRDataChange={handleQRDataChange} />
          </div>
          
          {/* Pro Features Teaser */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg shadow-lg p-6 text-white">
            <div className="flex items-center mb-4">
              <FaCrown className="h-8 w-8 mr-3" />
              <h3 className="text-xl font-bold">Unlock Pro Features</h3>
            </div>
            <p className="mb-4">
              Get access to dynamic QR codes, detailed analytics, bulk generation, and more.
            </p>
            <Link
              to="/pro-features"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-indigo-600 bg-white hover:bg-indigo-50"
            >
              Learn More <FaArrowRight className="ml-2" />
            </Link>
          </div>
        </div>

        {/* Middle Column - QR Preview */}
        <div className="lg:col-span-1">
          <div className="bg-white shadow overflow-hidden rounded-lg mb-8">
            <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
                <FaMagic className="mr-2" /> QR Code Preview
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                See your QR code and download options
              </p>
            </div>
            <QRPreview qrData={qrData} qrType={qrType} />
          </div>
        </div>

        {/* Right Column - Customization */}
        <div className="lg:col-span-1">
          <div className="bg-white shadow overflow-hidden rounded-lg">
            <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
                <FaMagic className="mr-2" /> Advanced Customization
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Personalize your QR code design
              </p>
            </div>
            <CustomizationPanel onCustomizationChange={handleCustomizationChange} />
          </div>
        </div>
      </div>

      {/* Ad Banner */}
      <div className="mt-12 mb-12">
        <GoogleAdsense adUnitId="homeBanner" />
      </div>

      {/* Features Section */}
      <div className="mt-16">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
          Powerful Features
        </h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Feature 1 */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="h-12 w-12 rounded-md bg-indigo-500 text-white flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Multi-Type QR Support</h3>
            <p className="text-gray-500">
              Create QR codes for URLs, WiFi, vCards, email, calendar events, and more.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="h-12 w-12 rounded-md bg-indigo-500 text-white flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Advanced Customization</h3>
            <p className="text-gray-500">
              Customize colors, shapes, add logos, and create unique QR code designs.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="h-12 w-12 rounded-md bg-indigo-500 text-white flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Dynamic QR Codes</h3>
            <p className="text-gray-500">
              Create editable QR codes that you can update anytime without reprinting.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="h-12 w-12 rounded-md bg-indigo-500 text-white flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Analytics Dashboard</h3>
            <p className="text-gray-500">
              Track scans, user engagement, and performance of your QR codes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
