import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaPalette, FaImage, FaShapes, FaEye } from 'react-icons/fa';

const CustomizationPanel = ({ onCustomizationChange }) => {
  const [customization, setCustomization] = useState({
    colors: {
      foreground: '#000000',
      background: '#FFFFFF',
      gradient: false,
      gradientColors: ['#6366F1', '#EC4899'],
      gradientDirection: 'to right'
    },
    shape: {
      dots: 'square',
      cornerDots: 'square',
      cornerSquareType: 'extra-rounded'
    },
    logo: {
      image: null,
      size: 0.2, // 20% of QR code size
      margin: 5,
      removeBackground: false
    },
    style: {
      frame: false,
      frameStyle: 'standard',
      frameLabel: '',
      frameLabelColor: '#000000',
      frameLabelSize: 16
    }
  });

  // Update customization and notify parent
  const updateCustomization = (section, key, value) => {
    const newCustomization = {
      ...customization,
      [section]: {
        ...customization[section],
        [key]: value
      }
    };
    
    setCustomization(newCustomization);
    onCustomizationChange(newCustomization);
  };

  // Handle gradient toggle
  const handleGradientToggle = (enabled) => {
    const newColors = {
      ...customization.colors,
      gradient: enabled
    };
    
    setCustomization({
      ...customization,
      colors: newColors
    });
    
    onCustomizationChange({
      ...customization,
      colors: newColors
    });
  };

  // Handle frame toggle
  const handleFrameToggle = (enabled) => {
    const newStyle = {
      ...customization.style,
      frame: enabled
    };
    
    setCustomization({
      ...customization,
      style: newStyle
    });
    
    onCustomizationChange({
      ...customization,
      style: newStyle
    });
  };

  // Handle logo upload
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.svg']
    },
    maxFiles: 1,
    onDrop: acceptedFiles => {
      const file = acceptedFiles[0];
      const reader = new FileReader();
      
      reader.onload = () => {
        updateCustomization('logo', 'image', reader.result);
      };
      
      reader.readAsDataURL(file);
    }
  });

  // Tabs for organization
  const [activeTab, setActiveTab] = useState('colors');

  return (
    <div className="bg-white shadow overflow-hidden rounded-lg">
      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex -mb-px">
          <button
            onClick={() => setActiveTab('colors')}
            className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
              activeTab === 'colors'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <FaPalette className="inline-block mr-2" />
            Colors
          </button>
          <button
            onClick={() => setActiveTab('shape')}
            className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
              activeTab === 'shape'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <FaShapes className="inline-block mr-2" />
            Shape
          </button>
          <button
            onClick={() => setActiveTab('logo')}
            className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
              activeTab === 'logo'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <FaImage className="inline-block mr-2" />
            Logo
          </button>
          <button
            onClick={() => setActiveTab('style')}
            className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
              activeTab === 'style'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <FaEye className="inline-block mr-2" />
            Style
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {/* Colors Tab */}
        {activeTab === 'colors' && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Color Options</h3>
            
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-700">
                Use Gradient
              </label>
              <div className="relative inline-block w-10 mr-2 align-middle select-none">
                <input
                  type="checkbox"
                  id="gradient-toggle"
                  checked={customization.colors.gradient}
                  onChange={(e) => handleGradientToggle(e.target.checked)}
                  className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                />
                <label
                  htmlFor="gradient-toggle"
                  className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${
                    customization.colors.gradient ? 'bg-indigo-500' : 'bg-gray-300'
                  }`}
                ></label>
              </div>
            </div>
            
            {!customization.colors.gradient ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Foreground Color
                  </label>
                  <div className="mt-1 flex items-center">
                    <input
                      type="color"
                      value={customization.colors.foreground}
                      onChange={(e) => updateCustomization('colors', 'foreground', e.target.value)}
                      className="h-10 w-20"
                    />
                    <span className="ml-2 text-sm text-gray-500">
                      {customization.colors.foreground}
                    </span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Background Color
                  </label>
                  <div className="mt-1 flex items-center">
                    <input
                      type="color"
                      value={customization.colors.background}
                      onChange={(e) => updateCustomization('colors', 'background', e.target.value)}
                      className="h-10 w-20"
                    />
                    <span className="ml-2 text-sm text-gray-500">
                      {customization.colors.background}
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Gradient Start Color
                  </label>
                  <div className="mt-1 flex items-center">
                    <input
                      type="color"
                      value={customization.colors.gradientColors[0]}
                      onChange={(e) => {
                        const newColors = [...customization.colors.gradientColors];
                        newColors[0] = e.target.value;
                        updateCustomization('colors', 'gradientColors', newColors);
                      }}
                      className="h-10 w-20"
                    />
                    <span className="ml-2 text-sm text-gray-500">
                      {customization.colors.gradientColors[0]}
                    </span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Gradient End Color
                  </label>
                  <div className="mt-1 flex items-center">
                    <input
                      type="color"
                      value={customization.colors.gradientColors[1]}
                      onChange={(e) => {
                        const newColors = [...customization.colors.gradientColors];
                        newColors[1] = e.target.value;
                        updateCustomization('colors', 'gradientColors', newColors);
                      }}
                      className="h-10 w-20"
                    />
                    <span className="ml-2 text-sm text-gray-500">
                      {customization.colors.gradientColors[1]}
                    </span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Gradient Direction
                  </label>
                  <select
                    value={customization.colors.gradientDirection}
                    onChange={(e) => updateCustomization('colors', 'gradientDirection', e.target.value)}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    <option value="to right">Horizontal</option>
                    <option value="to bottom">Vertical</option>
                    <option value="to bottom right">Diagonal</option>
                    <option value="to bottom left">Reverse Diagonal</option>
                  </select>
                </div>
              </>
            )}
          </div>
        )}

        {/* Shape Tab */}
        {activeTab === 'shape' && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Shape Options</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Dots Style
              </label>
              <select
                value={customization.shape.dots}
                onChange={(e) => updateCustomization('shape', 'dots', e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="square">Square</option>
                <option value="dots">Rounded</option>
                <option value="classy">Classy</option>
                <option value="classy-rounded">Classy Rounded</option>
                <option value="extra-rounded">Extra Rounded</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Corner Dots Style
              </label>
              <select
                value={customization.shape.cornerDots}
                onChange={(e) => updateCustomization('shape', 'cornerDots', e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="square">Square</option>
                <option value="dots">Rounded</option>
                <option value="extra-rounded">Extra Rounded</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Corner Square Style
              </label>
              <select
                value={customization.shape.cornerSquareType}
                onChange={(e) => updateCustomization('shape', 'cornerSquareType', e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="square">Square</option>
                <option value="extra-rounded">Extra Rounded</option>
                <option value="dot">Dot</option>
              </select>
            </div>
          </div>
        )}

        {/* Logo Tab */}
        {activeTab === 'logo' && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Logo Options</h3>
            
            <div {...getRootProps({ className: 'dropzone' })}>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                    >
                      <span>Upload a logo</span>
                      <input {...getInputProps()} />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, SVG up to 2MB</p>
                </div>
              </div>
            </div>
            
            {customization.logo.image && (
              <div className="mt-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Logo Preview</span>
                  <button
                    type="button"
                    onClick={() => updateCustomization('logo', 'image', null)}
                    className="text-sm text-red-600 hover:text-red-900"
                  >
                    Remove
                  </button>
                </div>
                <div className="mt-2 flex justify-center p-2 border border-gray-300 rounded-md">
                  <img
                    src={customization.logo.image}
                    alt="Logo preview"
                    className="h-16 w-16 object-contain"
                  />
                </div>
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Logo Size (% of QR code)
              </label>
              <div className="mt-1 flex items-center">
                <input
                  type="range"
                  min="0.1"
                  max="0.3"
                  step="0.01"
                  value={customization.logo.size}
                  onChange={(e) => updateCustomization('logo', 'size', parseFloat(e.target.value))}
                  className="block w-full"
                />
                <span className="ml-2 text-sm text-gray-500">
                  {Math.round(customization.logo.size * 100)}%
                </span>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Logo Margin
              </label>
              <div className="mt-1 flex items-center">
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="1"
                  value={customization.logo.margin}
                  onChange={(e) => updateCustomization('logo', 'margin', parseInt(e.target.value))}
                  className="block w-full"
                />
                <span className="ml-2 text-sm text-gray-500">
                  {customization.logo.margin}px
                </span>
              </div>
            </div>
            
            <div className="flex items-center">
              <input
                id="remove-bg"
                name="remove-bg"
                type="checkbox"
                checked={customization.logo.removeBackground}
                onChange={(e) => updateCustomization('logo', 'removeBackground', e.target.checked)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="remove-bg" className="ml-2 block text-sm text-gray-700">
                Remove logo background (works best with PNG)
              </label>
            </div>
          </div>
        )}

        {/* Style Tab */}
        {activeTab === 'style' && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Style Options</h3>
            
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-700">
                Add Frame
              </label>
              <div className="relative inline-block w-10 mr-2 align-middle select-none">
                <input
                  type="checkbox"
                  id="frame-toggle"
                  checked={customization.style.frame}
                  onChange={(e) => handleFrameToggle(e.target.checked)}
                  className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                />
                <label
                  htmlFor="frame-toggle"
                  className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${
                    customization.style.frame ? 'bg-indigo-500' : 'bg-gray-300'
                  }`}
                ></label>
              </div>
            </div>
            
            {customization.style.frame && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Frame Style
                  </label>
                  <select
                    value={customization.style.frameStyle}
                    onChange={(e) => updateCustomization('style', 'frameStyle', e.target.value)}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    <option value="standard">Standard</option>
                    <option value="rounded">Rounded</option>
                    <option value="circle">Circle</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Frame Label
                  </label>
                  <input
                    type="text"
                    value={customization.style.frameLabel}
                    onChange={(e) => updateCustomization('style', 'frameLabel', e.target.value)}
                    placeholder="Scan me"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Label Color
                  </label>
                  <div className="mt-1 flex items-center">
                    <input
                      type="color"
                      value={customization.style.frameLabelColor}
                      onChange={(e) => updateCustomization('style', 'frameLabelColor', e.target.value)}
                      className="h-10 w-20"
                    />
                    <span className="ml-2 text-sm text-gray-500">
                      {customization.style.frameLabelColor}
                    </span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Label Size
                  </label>
                  <div className="mt-1 flex items-center">
                    <input
                      type="range"
                      min="12"
                      max="24"
                      step="1"
                      value={customization.style.frameLabelSize}
                      onChange={(e) => updateCustomization('style', 'frameLabelSize', parseInt(e.target.value))}
                      className="block w-full"
                    />
                    <span className="ml-2 text-sm text-gray-500">
                      {customization.style.frameLabelSize}px
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomizationPanel;
