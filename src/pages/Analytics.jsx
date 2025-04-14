import React, { useState } from 'react';
import { FaChartBar, FaGlobe, FaMobile, FaCalendarAlt, FaQrcode } from 'react-icons/fa';

// Mock data for the analytics dashboard
const mockAnalyticsData = {
  totalScans: 12458,
  uniqueUsers: 8721,
  averageScanDuration: '00:42',
  conversionRate: '24.8%',
  topQRCodes: [
    { id: 'qr1', name: 'Website Homepage', scans: 2845, conversionRate: '32.4%' },
    { id: 'qr2', name: 'Product Catalog', scans: 1932, conversionRate: '28.7%' },
    { id: 'qr3', name: 'Special Offer', scans: 1756, conversionRate: '41.2%' },
    { id: 'qr4', name: 'Event Registration', scans: 1243, conversionRate: '37.8%' },
    { id: 'qr5', name: 'Contact Information', scans: 987, conversionRate: '12.5%' }
  ],
  dailyScans: [
    { date: '2025-04-07', scans: 342 },
    { date: '2025-04-08', scans: 378 },
    { date: '2025-04-09', scans: 412 },
    { date: '2025-04-10', scans: 389 },
    { date: '2025-04-11', scans: 425 },
    { date: '2025-04-12', scans: 487 },
    { date: '2025-04-13', scans: 512 }
  ],
  deviceBreakdown: [
    { name: 'Mobile', value: 72 },
    { name: 'Desktop', value: 18 },
    { name: 'Tablet', value: 10 }
  ],
  locationData: [
    { country: 'United States', scans: 4235 },
    { country: 'India', scans: 2156 },
    { country: 'United Kingdom', scans: 1432 },
    { country: 'Germany', scans: 987 },
    { country: 'Canada', scans: 876 },
    { country: 'Australia', scans: 745 },
    { country: 'Japan', scans: 612 },
    { country: 'Brazil', scans: 587 },
    { country: 'France', scans: 543 },
    { country: 'Mexico', scans: 432 }
  ]
};

const Analytics = () => {
  const [dateRange, setDateRange] = useState('week');
  const [selectedQR, setSelectedQR] = useState(null);
  
  // Function to format numbers with commas
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  
  // Calculate percentage for device breakdown chart
  const calculatePercentage = (value) => {
    return `${value}%`;
  };
  
  // Handle QR code selection
  const handleQRSelect = (qrCode) => {
    setSelectedQR(qrCode);
  };
  
  // Clear QR selection
  const clearQRSelection = () => {
    setSelectedQR(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="md:flex md:items-center md:justify-between mb-8">
        <div className="flex-1 min-w-0">
          <h1 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
            Analytics Dashboard
          </h1>
          <p className="mt-1 text-lg text-gray-500">
            Track performance and insights for your QR codes
          </p>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <div className="inline-flex shadow-sm rounded-md">
            <button
              type="button"
              onClick={() => setDateRange('week')}
              className={`px-4 py-2 text-sm font-medium rounded-l-md ${
                dateRange === 'week'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              } border border-gray-300 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500`}
            >
              Week
            </button>
            <button
              type="button"
              onClick={() => setDateRange('month')}
              className={`px-4 py-2 text-sm font-medium ${
                dateRange === 'month'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              } border-t border-b border-gray-300 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500`}
            >
              Month
            </button>
            <button
              type="button"
              onClick={() => setDateRange('year')}
              className={`px-4 py-2 text-sm font-medium rounded-r-md ${
                dateRange === 'year'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              } border border-gray-300 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500`}
            >
              Year
            </button>
          </div>
          <button
            type="button"
            className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <FaCalendarAlt className="mr-2 -ml-1 h-4 w-4" />
            Custom Range
          </button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {/* Total Scans */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                <FaQrcode className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Scans
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">
                      {formatNumber(mockAnalyticsData.totalScans)}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-4 sm:px-6">
            <div className="text-sm">
              <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500">
                View all scans
              </button>
            </div>
          </div>
        </div>

        {/* Unique Users */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                <FaGlobe className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Unique Users
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">
                      {formatNumber(mockAnalyticsData.uniqueUsers)}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-4 sm:px-6">
            <div className="text-sm">
              <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500">
                View user details
              </button>
            </div>
          </div>
        </div>

        {/* Average Scan Duration */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                <FaChartBar className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Avg. Scan Duration
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">
                      {mockAnalyticsData.averageScanDuration}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-4 sm:px-6">
            <div className="text-sm">
              <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500">
                View engagement metrics
              </button>
            </div>
          </div>
        </div>

        {/* Conversion Rate */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-purple-500 rounded-md p-3">
                <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Conversion Rate
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">
                      {mockAnalyticsData.conversionRate}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-4 sm:px-6">
            <div className="text-sm">
              <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500">
                View conversion details
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Daily Scans Chart */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
              <FaChartBar className="mr-2" /> Daily Scans
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Number of scans per day for the last 7 days
            </p>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <div className="h-80 relative">
              {/* Simple bar chart visualization */}
              <div className="absolute inset-0 flex items-end">
                {mockAnalyticsData.dailyScans.map((day, index) => (
                  <div key={day.date} className="flex-1 flex flex-col items-center">
                    <div 
                      className="bg-indigo-500 rounded-t-md w-16"
                      style={{ 
                        height: `${(day.scans / Math.max(...mockAnalyticsData.dailyScans.map(d => d.scans))) * 70}%`
                      }}
                    ></div>
                    <div className="mt-2 text-xs text-gray-500">
                      {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      {day.scans}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Device Breakdown */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
              <FaMobile className="mr-2" /> Device Breakdown
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Distribution of scans by device type
            </p>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <div className="h-80 flex items-center justify-center">
              {/* Simple donut chart visualization */}
              <div className="relative w-64 h-64">
                <svg viewBox="0 0 20 20" className="w-full h-full">
                  <circle r="10" cx="10" cy="10" fill="#4F46E5" />
                  <circle r="5" cx="10" cy="10" fill="white" />
                  <circle
                    r="10"
                    cx="10"
                    cy="10"
                    fill="transparent"
                    stroke="#10B981"
                    strokeWidth="10"
                    strokeDasharray={`${mockAnalyticsData.deviceBreakdown[1].value} ${100 - mockAnalyticsData.deviceBreakdown[1].value}`}
                    strokeDashoffset="25"
                  />
                  <circle
                    r="10"
                    cx="10"
                    cy="10"
                    fill="transparent"
                    stroke="#F59E0B"
                    strokeWidth="10"
                    strokeDasharray={`${mockAnalyticsData.deviceBreakdown[2].value} ${100 - mockAnalyticsData.deviceBreakdown[2].value}`}
                    strokeDashoffset={`${100 - mockAnalyticsData.deviceBreakdown[1].value + 25}`}
                  />
                </svg>
              </div>
              <div className="ml-8">
                <div className="flex items-center mb-4">
                  <div className="w-4 h-4 bg-indigo-600 rounded-full mr-2"></div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">Mobile</div>
                    <div className="text-sm text-gray-500">{calculatePercentage(mockAnalyticsData.deviceBreakdown[0].value)}</div>
                  </div>
                </div>
                <div className="flex items-center mb-4">
                  <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">Desktop</div>
                    <div className="text-sm text-gray-500">{calculatePercentage(mockAnalyticsData.deviceBreakdown[1].value)}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-yellow-500 rounded-full mr-2"></div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">Tablet</div>
                    <div className="text-sm text-gray-500">{calculatePercentage(mockAnalyticsData.deviceBreakdown[2].value)}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Top QR Codes */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
              <FaQrcode className="mr-2" /> Top Performing QR Codes
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Your most scanned QR codes and their performance
            </p>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      QR Code
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Scans
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Conversion Rate
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockAnalyticsData.topQRCodes.map((qrCode) => (
                    <tr 
                      key={qrCode.id}
                      className={selectedQR && selectedQR.id === qrCode.id ? 'bg-indigo-50' : 'hover:bg-gray-50'}
                      onClick={() => handleQRSelect(qrCode)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-md flex items-center justify-center">
                            <FaQrcode className="h-6 w-6 text-indigo-600" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{qrCode.name}</div>
                            <div className="text-sm text-gray-500">ID: {qrCode.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{formatNumber(qrCode.scans)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{qrCode.conversionRate}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button type="button" className="text-indigo-600 hover:text-indigo-900 mr-3">View</button>
                        <button type="button" className="text-indigo-600 hover:text-indigo-900">Edit</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Geographic Distribution */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
              <FaGlobe className="mr-2" /> Geographic Distribution
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Top countries by scan volume
            </p>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Country
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Scans
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Percentage
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockAnalyticsData.locationData.map((location, index) => {
                    const totalScans = mockAnalyticsData.locationData.reduce((sum, loc) => sum + loc.scans, 0);
                    const percentage = ((location.scans / totalScans) * 100).toFixed(1);
                    
                    return (
                      <tr key={location.country} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="text-sm font-medium text-gray-900">{location.country}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{formatNumber(location.scans)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                              <div 
                                className="bg-indigo-600 h-2.5 rounded-full" 
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                            <span className="ml-2 text-sm text-gray-500">{percentage}%</span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* QR Code Detail Modal */}
      {selectedQR && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={clearQRSelection}></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10">
                    <FaQrcode className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                      {selectedQR.name}
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Detailed analytics for this QR code.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-5 grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm font-medium text-gray-500">Total Scans</div>
                    <div className="mt-1 text-3xl font-semibold text-gray-900">{formatNumber(selectedQR.scans)}</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm font-medium text-gray-500">Conversion Rate</div>
                    <div className="mt-1 text-3xl font-semibold text-gray-900">{selectedQR.conversionRate}</div>
                  </div>
                </div>
                
                <div className="mt-5">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Daily Scan Trend</h4>
                  <div className="bg-gray-50 p-4 rounded-lg h-40 flex items-end justify-between">
                    {[35, 42, 58, 47, 61, 68, 72].map((value, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <div 
                          className="bg-indigo-500 rounded-t-sm w-8"
                          style={{ height: `${(value / 80) * 100}%` }}
                        ></div>
                        <div className="mt-2 text-xs text-gray-500">
                          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button 
                  type="button" 
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={clearQRSelection}
                >
                  View Full Report
                </button>
                <button 
                  type="button" 
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={clearQRSelection}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Analytics;
