import React, { useState, useRef } from 'react';
import { QRPreview as QRGenerator } from '../utils/generateQR';
import { FaDownload, FaImage, FaFilePdf, FaCode } from 'react-icons/fa';
import { saveAs } from 'file-saver';
import { toPng, toSvg } from 'html-to-image';
import { jsPDF } from 'jspdf';

const QRPreview = ({ qrData, qrType }) => {
  const [customOptions, setCustomOptions] = useState({
    size: 256,
    bgColor: '#FFFFFF',
    fgColor: '#000000',
    level: 'L',
    includeMargin: true,
    imageSettings: null
  });
  
  const qrRef = useRef(null);
  
  // Handle customization changes
  const handleOptionChange = (e) => {
    const { name, value } = e.target;
    setCustomOptions(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle logo upload
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCustomOptions(prev => ({
          ...prev,
          imageSettings: {
            src: event.target.result,
            height: 24,
            width: 24,
            excavate: true
          }
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Download QR code as PNG
  const downloadAsPNG = () => {
    if (qrRef.current) {
      toPng(qrRef.current)
        .then((dataUrl) => {
          saveAs(dataUrl, `qrcode-${qrType}-${Date.now()}.png`);
        })
        .catch((error) => {
          console.error('Error generating PNG:', error);
        });
    }
  };

  // Download QR code as SVG
  const downloadAsSVG = () => {
    if (qrRef.current) {
      toSvg(qrRef.current)
        .then((dataUrl) => {
          saveAs(dataUrl, `qrcode-${qrType}-${Date.now()}.svg`);
        })
        .catch((error) => {
          console.error('Error generating SVG:', error);
        });
    }
  };

  // Download QR code as PDF
  const downloadAsPDF = () => {
    if (qrRef.current) {
      toPng(qrRef.current)
        .then((dataUrl) => {
          const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
          });
          
          // Add title
          pdf.setFontSize(16);
          pdf.text('Your QR Code', 105, 20, { align: 'center' });
          
          // Add QR code
          const imgWidth = 100;
          const imgHeight = 100;
          pdf.addImage(
            dataUrl, 
            'PNG', 
            (pdf.internal.pageSize.width - imgWidth) / 2, 
            40, 
            imgWidth, 
            imgHeight
          );
          
          // Add QR data text
          pdf.setFontSize(12);
          pdf.text(
            `QR Type: ${qrType.toUpperCase()}`, 
            105, 
            150, 
            { align: 'center' }
          );
          
          // Save PDF
          pdf.save(`qrcode-${qrType}-${Date.now()}.pdf`);
        })
        .catch((error) => {
          console.error('Error generating PDF:', error);
        });
    }
  };

  // Get HTML code for embedding
  const getEmbedCode = () => {
    const embedCode = `<img src="${window.location.origin}/api/qr?data=${encodeURIComponent(qrData)}&bgColor=${encodeURIComponent(customOptions.bgColor)}&fgColor=${encodeURIComponent(customOptions.fgColor)}&size=${customOptions.size}" alt="QR Code" />`;
    
    navigator.clipboard.writeText(embedCode)
      .then(() => {
        alert('Embed code copied to clipboard!');
      })
      .catch((error) => {
        console.error('Error copying embed code:', error);
        alert('Failed to copy embed code. Please try again.');
      });
  };

  return (
    <div className="bg-white shadow overflow-hidden rounded-lg p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">QR Code Preview</h2>
      
      {/* QR Code Preview */}
      <div className="flex justify-center mb-6">
        <div 
          ref={qrRef} 
          className="p-4 bg-white rounded-lg shadow-sm border border-gray-200"
        >
          <QRGenerator 
            text={qrData} 
            options={customOptions} 
          />
        </div>
      </div>
      
      {/* Customization Options */}
      <div className="mb-6">
        <h3 className="text-md font-medium text-gray-700 mb-3">Customize</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="fgColor" className="block text-sm font-medium text-gray-700">
              Foreground Color
            </label>
            <input
              type="color"
              id="fgColor"
              name="fgColor"
              value={customOptions.fgColor}
              onChange={handleOptionChange}
              className="mt-1 block w-full h-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="bgColor" className="block text-sm font-medium text-gray-700">
              Background Color
            </label>
            <input
              type="color"
              id="bgColor"
              name="bgColor"
              value={customOptions.bgColor}
              onChange={handleOptionChange}
              className="mt-1 block w-full h-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>
        
        <div className="mt-4">
          <label htmlFor="size" className="block text-sm font-medium text-gray-700">
            Size: {customOptions.size}px
          </label>
          <input
            type="range"
            id="size"
            name="size"
            min="128"
            max="512"
            step="8"
            value={customOptions.size}
            onChange={handleOptionChange}
            className="mt-1 block w-full"
          />
        </div>
        
        <div className="mt-4">
          <label htmlFor="level" className="block text-sm font-medium text-gray-700">
            Error Correction Level
          </label>
          <select
            id="level"
            name="level"
            value={customOptions.level}
            onChange={handleOptionChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="L">Low (7%)</option>
            <option value="M">Medium (15%)</option>
            <option value="Q">Quartile (25%)</option>
            <option value="H">High (30%)</option>
          </select>
        </div>
        
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            Add Logo (Optional)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleLogoUpload}
            className="mt-1 block w-full px-3 py-2 text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100"
          />
          {customOptions.imageSettings && (
            <button
              type="button"
              onClick={() => setCustomOptions(prev => ({ ...prev, imageSettings: null }))}
              className="mt-2 text-sm text-red-600 hover:text-red-800"
            >
              Remove Logo
            </button>
          )}
        </div>
        
        <div className="mt-4">
          <div className="flex items-center">
            <input
              id="includeMargin"
              name="includeMargin"
              type="checkbox"
              checked={customOptions.includeMargin}
              onChange={(e) => setCustomOptions(prev => ({ ...prev, includeMargin: e.target.checked }))}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="includeMargin" className="ml-2 block text-sm text-gray-700">
              Include Margin
            </label>
          </div>
        </div>
      </div>
      
      {/* Download Options */}
      <div>
        <h3 className="text-md font-medium text-gray-700 mb-3">Download & Share</h3>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={downloadAsPNG}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <FaImage className="mr-2" /> PNG
          </button>
          <button
            type="button"
            onClick={downloadAsSVG}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <FaDownload className="mr-2" /> SVG
          </button>
          <button
            type="button"
            onClick={downloadAsPDF}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <FaFilePdf className="mr-2" /> PDF
          </button>
          <button
            type="button"
            onClick={getEmbedCode}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <FaCode className="mr-2" /> Embed Code
          </button>
        </div>
      </div>
    </div>
  );
};

export default QRPreview;
