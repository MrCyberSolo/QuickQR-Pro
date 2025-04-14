import React, { useState } from 'react';
import { FaWifi, FaIdCard, FaUtensils, FaCalendarAlt, FaMapMarkerAlt, FaShoppingCart, FaDownload } from 'react-icons/fa';
// import { generateQRData } from '../utils/generateQR';
import { QRPreview } from '../utils/generateQR';
import GoogleAdsense from '../components/GoogleAdsense';

const Templates = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [templateData, setTemplateData] = useState({});
  const [qrData, setQrData] = useState('');

  // Template categories
  const templates = [
    {
      id: 'wifi',
      name: 'WiFi Connect',
      icon: <FaWifi className="h-8 w-8 text-indigo-600" />,
      description: 'Create a QR code for guests to connect to your WiFi network instantly',
      fields: [
        { name: 'ssid', label: 'Network Name (SSID)', type: 'text', required: true },
        { name: 'password', label: 'Password', type: 'password', required: true },
        { name: 'encryption', label: 'Security Type', type: 'select', options: ['WPA/WPA2', 'WEP', 'None'], required: true }
      ]
    },
    {
      id: 'vcard',
      name: 'Digital Business Card',
      icon: <FaIdCard className="h-8 w-8 text-indigo-600" />,
      description: 'Share your contact information with a simple scan',
      fields: [
        { name: 'firstName', label: 'First Name', type: 'text', required: true },
        { name: 'lastName', label: 'Last Name', type: 'text', required: true },
        { name: 'email', label: 'Email', type: 'email', required: true },
        { name: 'phone', label: 'Phone', type: 'tel', required: false },
        { name: 'company', label: 'Company', type: 'text', required: false },
        { name: 'title', label: 'Job Title', type: 'text', required: false },
        { name: 'website', label: 'Website', type: 'url', required: false },
        { name: 'address', label: 'Address', type: 'text', required: false }
      ]
    },
    {
      id: 'restaurant',
      name: 'Restaurant Menu',
      icon: <FaUtensils className="h-8 w-8 text-indigo-600" />,
      description: 'Create a digital menu for your restaurant',
      fields: [
        { name: 'restaurantName', label: 'Restaurant Name', type: 'text', required: true },
        { name: 'menuUrl', label: 'Menu URL', type: 'url', required: true },
        { name: 'description', label: 'Short Description', type: 'textarea', required: false }
      ]
    },
    {
      id: 'event',
      name: 'Event RSVP',
      icon: <FaCalendarAlt className="h-8 w-8 text-indigo-600" />,
      description: 'Create a QR code for event registration and RSVP',
      fields: [
        { name: 'eventName', label: 'Event Name', type: 'text', required: true },
        { name: 'eventDate', label: 'Event Date', type: 'date', required: true },
        { name: 'eventTime', label: 'Event Time', type: 'time', required: true },
        { name: 'location', label: 'Location', type: 'text', required: true },
        { name: 'rsvpUrl', label: 'RSVP URL', type: 'url', required: true },
        { name: 'details', label: 'Event Details', type: 'textarea', required: false }
      ]
    },
    {
      id: 'location',
      name: 'Location',
      icon: <FaMapMarkerAlt className="h-8 w-8 text-indigo-600" />,
      description: 'Share your location or meeting point',
      fields: [
        { name: 'locationName', label: 'Location Name', type: 'text', required: true },
        { name: 'latitude', label: 'Latitude', type: 'number', required: true },
        { name: 'longitude', label: 'Longitude', type: 'number', required: true },
        { name: 'description', label: 'Description', type: 'textarea', required: false }
      ]
    },
    {
      id: 'product',
      name: 'Product Information',
      icon: <FaShoppingCart className="h-8 w-8 text-indigo-600" />,
      description: 'Create QR codes for product details, manuals, or purchase links',
      fields: [
        { name: 'productName', label: 'Product Name', type: 'text', required: true },
        { name: 'productUrl', label: 'Product URL', type: 'url', required: true },
        { name: 'description', label: 'Description', type: 'textarea', required: false }
      ]
    }
  ];

  // Handle template selection
  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    
    // Initialize template data with empty values
    const initialData = {};
    template.fields.forEach(field => {
      initialData[field.name] = '';
      if (field.type === 'select' && field.options && field.options.length > 0) {
        initialData[field.name] = field.options[0];
      }
    });
    
    setTemplateData(initialData);
    setQrData('');
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTemplateData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Generate QR code from template data
  const generateQR = () => {
    if (!selectedTemplate) return;
    
    let qrContent = '';
    
    switch (selectedTemplate.id) {
      case 'wifi':
        const encryption = templateData.encryption === 'None' ? 'nopass' : templateData.encryption === 'WEP' ? 'WEP' : 'WPA';
        qrContent = `WIFI:S:${templateData.ssid};T:${encryption};P:${templateData.password};;`;
        break;
        
      case 'vcard':
        qrContent = `BEGIN:VCARD
VERSION:3.0
N:${templateData.lastName || ''};${templateData.firstName || ''}
FN:${templateData.firstName || ''} ${templateData.lastName || ''}
ORG:${templateData.company || ''}
TITLE:${templateData.title || ''}
TEL:${templateData.phone || ''}
EMAIL:${templateData.email || ''}
URL:${templateData.website || ''}
ADR:;;${templateData.address || ''}
END:VCARD`;
        break;
        
      case 'restaurant':
      case 'product':
        qrContent = templateData.menuUrl || templateData.productUrl;
        break;
        
      case 'event':
        qrContent = templateData.rsvpUrl;
        break;
        
      case 'location':
        qrContent = `geo:${templateData.latitude},${templateData.longitude}`;
        break;
        
      default:
        qrContent = JSON.stringify(templateData);
    }
    
    setQrData(qrContent);
  };

  // Validate form before generating QR
  const validateForm = () => {
    if (!selectedTemplate) return false;
    
    return selectedTemplate.fields.every(field => {
      if (field.required) {
        return templateData[field.name] && templateData[field.name].trim() !== '';
      }
      return true;
    });
  };

  // Render form fields based on selected template
  const renderTemplateForm = () => {
    if (!selectedTemplate) return null;
    
    return (
      <div className="mt-6 bg-white shadow overflow-hidden rounded-lg">
        <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
            {selectedTemplate.icon}
            <span className="ml-2">{selectedTemplate.name} Template</span>
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            {selectedTemplate.description}
          </p>
        </div>
        
        <div className="px-4 py-5 sm:p-6">
          <form className="space-y-6">
            {selectedTemplate.fields.map((field) => (
              <div key={field.name}>
                <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
                  {field.label} {field.required && <span className="text-red-500">*</span>}
                </label>
                
                {field.type === 'select' ? (
                  <select
                    id={field.name}
                    name={field.name}
                    value={templateData[field.name] || ''}
                    onChange={handleInputChange}
                    required={field.required}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    {field.options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : field.type === 'textarea' ? (
                  <textarea
                    id={field.name}
                    name={field.name}
                    value={templateData[field.name] || ''}
                    onChange={handleInputChange}
                    required={field.required}
                    rows={3}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                ) : (
                  <input
                    type={field.type}
                    id={field.name}
                    name={field.name}
                    value={templateData[field.name] || ''}
                    onChange={handleInputChange}
                    required={field.required}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                )}
              </div>
            ))}
            
            <div className="pt-5">
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedTemplate(null)}
                  className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Back to Templates
                </button>
                <button
                  type="button"
                  onClick={generateQR}
                  disabled={!validateForm()}
                  className={`ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${
                    validateForm() ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-400 cursor-not-allowed'
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                >
                  Generate QR Code
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // Render QR code preview
  const renderQRPreview = () => {
    if (!qrData) return null;
    
    return (
      <div className="mt-6 bg-white shadow overflow-hidden rounded-lg">
        <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            QR Code Preview
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Scan to test or download to use
          </p>
        </div>
        
        <div className="px-4 py-5 sm:p-6 flex flex-col items-center">
          <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
            <QRPreview text={qrData} options={{ size: 200 }} />
          </div>
          
          <button
            type="button"
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <FaDownload className="mr-2" /> Download QR Code
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
          QR <span className="text-indigo-600">Templates</span>
        </h1>
        <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
          Choose from our pre-designed templates to quickly create QR codes for common use cases.
        </p>
      </div>

      {/* Template Selection or Form */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        <div className="lg:col-span-3">
          {/* Main content area */}
        </div>
        <div className="lg:col-span-1">
          {/* Sidebar Ad */}
          <div className="bg-white shadow rounded-lg p-4 sticky top-4">
            <h3 className="text-sm font-medium text-gray-500 mb-4">Sponsored</h3>
            <GoogleAdsense adUnitId="templatesSidebar" />
          </div>
        </div>
      </div>

      {!selectedTemplate ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {templates.map((template) => (
            <div
              key={template.id}
              className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              onClick={() => handleTemplateSelect(template)}
            >
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    {template.icon}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">{template.name}</h3>
                    <p className="mt-1 text-sm text-gray-500">{template.description}</p>
                  </div>
                </div>
              </div>
              <div className="px-4 py-4 sm:px-6 bg-gray-50">
                <div className="text-sm text-right">
                  <span className="font-medium text-indigo-600 hover:text-indigo-500">
                    Select template <span aria-hidden="true">&rarr;</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div>
            {renderTemplateForm()}
          </div>
          <div>
            {renderQRPreview()}
          </div>
        </div>
      )}
    </div>
  );
};

export default Templates;
