import React, { useState } from 'react';
import { FaCopy, FaCheckCircle } from 'react-icons/fa';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const ApiDocs = () => {
  const [copiedSnippet, setCopiedSnippet] = useState(null);

  // API endpoint base URL - using our local API server
  const apiBaseUrl = 'https://api.dynamic-balancig.com';

  // API documentation sections
  const apiEndpoints = [
    {
      id: 'generate',
      name: 'Generate QR Code',
      endpoint: '/api/qr/generate',
      method: 'GET',
      description: 'Generate a QR code image with custom parameters',
      parameters: [
        { name: 'data', type: 'string', required: true, description: 'Content to encode in the QR code' },
        { name: 'size', type: 'number', required: false, description: 'Size of the QR code in pixels (default: 256)' },
        { name: 'format', type: 'string', required: false, description: 'Output format: png, svg, or pdf (default: png)' },
        { name: 'foreground', type: 'string', required: false, description: 'Foreground color as hex code (default: #000000)' },
        { name: 'background', type: 'string', required: false, description: 'Background color as hex code (default: #FFFFFF)' },
        { name: 'errorCorrection', type: 'string', required: false, description: 'Error correction level: L, M, Q, or H (default: M)' },
        { name: 'logo', type: 'string', required: false, description: 'URL of logo to overlay on QR code' },
      ],
      exampleRequest: `${apiBaseUrl}/api/qr/generate?data=https://example.com&size=300&format=svg&foreground=%23000000&background=%23FFFFFF`,
      exampleResponse: {
        success: true,
        url: `${apiBaseUrl}/qr/image/a1b2c3d4.svg`,
        expiresAt: '2025-05-13T15:30:00Z'
      },
      codeSnippets: {
        javascript: `// Using fetch API
fetch('${apiBaseUrl}/api/qr/generate?data=https://example.com&size=300')
  .then(response => response.json())
  .then(data => {
    console.log('QR Code URL:', data.url);
    // Use the URL in your application
    const qrImage = document.createElement('img');
    qrImage.src = data.url;
    document.body.appendChild(qrImage);
  })
  .catch(error => console.error('Error:', error));`,
        
        python: `# Using requests library
import requests

response = requests.get(
    '${apiBaseUrl}/api/qr/generate',
    params={
        'data': 'https://example.com',
        'size': 300,
        'format': 'png'
    }
)

if response.status_code == 200:
    data = response.json()
    print('QR Code URL:', data['url'])
    # Download the image
    image_response = requests.get(data['url'])
    with open('qrcode.png', 'wb') as f:
        f.write(image_response.content)
else:
    print('Error:', response.status_code)`,
        
        curl: `curl -X GET "${apiBaseUrl}/api/qr/generate?data=https://example.com&size=300&format=png"`
      }
    },
    {
      id: 'dynamic',
      name: 'Create Dynamic QR Code',
      endpoint: '/api/qr/dynamic',
      method: 'POST',
      description: 'Create a dynamic QR code that can be updated later',
      parameters: [
        { name: 'targetUrl', type: 'string', required: true, description: 'URL that the QR code will redirect to' },
        { name: 'title', type: 'string', required: true, description: 'Title for the QR code' },
        { name: 'expiresAt', type: 'string', required: false, description: 'Expiration date (ISO format)' },
        { name: 'trackAnalytics', type: 'boolean', required: false, description: 'Whether to track analytics for this QR code' },
        { name: 'password', type: 'string', required: false, description: 'Password to protect the QR code' },
      ],
      exampleRequest: {
        targetUrl: 'https://example.com/landing-page',
        title: 'Marketing Campaign QR',
        expiresAt: '2025-12-31T23:59:59Z',
        trackAnalytics: true
      },
      exampleResponse: {
        success: true,
        qrId: 'dyn_a1b2c3d4',
        shortUrl: `${apiBaseUrl}/q/a1b2c3`,
        qrImageUrl: `${apiBaseUrl}/qr/dynamic/a1b2c3d4.png`
      },
      codeSnippets: {
        javascript: `// Using fetch API
fetch('${apiBaseUrl}/api/qr/dynamic', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    targetUrl: 'https://example.com/landing-page',
    title: 'Marketing Campaign QR',
    trackAnalytics: true
  })
})
  .then(response => response.json())
  .then(data => {
    console.log('Dynamic QR created:', data);
    // Use the QR code image URL or short URL
  })
  .catch(error => console.error('Error:', error));`,
        
        python: `# Using requests library
import requests
import json

headers = {
    'Content-Type': 'application/json'
}

data = {
    'targetUrl': 'https://example.com/landing-page',
    'title': 'Marketing Campaign QR',
    'trackAnalytics': True
}

response = requests.post(
    '${apiBaseUrl}/api/qr/dynamic',
    headers=headers,
    data=json.dumps(data)
)

if response.status_code == 200:
    result = response.json()
    print('Dynamic QR created:', result)
else:
    print('Error:', response.status_code)`,
        
        curl: `curl -X POST "${apiBaseUrl}/api/qr/dynamic" \\
  -H "Content-Type: application/json" \\
  -d '{"targetUrl":"https://example.com/landing-page","title":"Marketing Campaign QR","trackAnalytics":true}'`
      }
    },
    {
      id: 'analytics',
      name: 'Get QR Code Analytics',
      endpoint: '/api/qr/analytics/{qrId}',
      method: 'GET',
      description: 'Retrieve analytics data for a dynamic QR code',
      parameters: [
        { name: 'qrId', type: 'string', required: true, description: 'ID of the QR code' },
        { name: 'startDate', type: 'string', required: false, description: 'Start date for analytics (ISO format)' },
        { name: 'endDate', type: 'string', required: false, description: 'End date for analytics (ISO format)' },
      ],
      exampleRequest: `${apiBaseUrl}/api/qr/analytics/dyn_a1b2c3d4?startDate=2025-01-01T00:00:00Z&endDate=2025-04-01T00:00:00Z`,
      exampleResponse: {
        success: true,
        qrId: 'dyn_a1b2c3d4',
        totalScans: 1245,
        uniqueScans: 876,
        scansPerDay: [
          { date: '2025-01-01', count: 45 },
          { date: '2025-01-02', count: 52 },
          // ... more data
        ],
        topDevices: [
          { name: 'iPhone', count: 523 },
          { name: 'Android', count: 412 },
          { name: 'Desktop', count: 310 }
        ],
        topLocations: [
          { country: 'United States', count: 645 },
          { country: 'India', count: 234 },
          { country: 'Germany', count: 156 }
        ]
      },
      codeSnippets: {
        javascript: `// Using fetch API
fetch('${apiBaseUrl}/api/qr/analytics/dyn_a1b2c3d4?startDate=2025-01-01T00:00:00Z', {
  headers: {}
})
  .then(response => response.json())
  .then(data => {
    console.log('QR Analytics:', data);
    // Process analytics data
  })
  .catch(error => console.error('Error:', error));`,
        
        python: `# Using requests library
import requests

headers = {}

params = {
    'startDate': '2025-01-01T00:00:00Z',
    'endDate': '2025-04-01T00:00:00Z'
}

response = requests.get(
    '${apiBaseUrl}/api/qr/analytics/dyn_a1b2c3d4',
    headers=headers,
    params=params
)

if response.status_code == 200:
    analytics = response.json()
    print('Total scans:', analytics['totalScans'])
    print('Unique scans:', analytics['uniqueScans'])
else:
    print('Error:', response.status_code)`,
        
        curl: `curl -X GET "${apiBaseUrl}/api/qr/analytics/dyn_a1b2c3d4?startDate=2025-01-01T00:00:00Z" \\
  -H "Authorization: Bearer YOUR_API_KEY"`
      }
    }
  ];

  // Function to copy code snippet to clipboard
  const copyToClipboard = (code, snippetId) => {
    navigator.clipboard.writeText(code)
      .then(() => {
        setCopiedSnippet(snippetId);
        setTimeout(() => setCopiedSnippet(null), 2000);
      })
      .catch(err => {
        console.error('Failed to copy code: ', err);
      });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
          API <span className="text-indigo-600">Documentation</span>
        </h1>
        <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
          Integrate QR code generation into your applications with our simple REST API.
        </p>
      </div>

      {/* No API Key Required Section */}
      <div className="bg-white shadow overflow-hidden rounded-lg mb-10">
        <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
          <h2 className="text-lg leading-6 font-medium text-gray-900">No Authentication Required</h2>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Our API is open and doesn't require any API key for basic usage.
          </p>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <p className="text-sm text-gray-700 mb-4">
            Simply make requests to our endpoints without any authentication headers:
          </p>
          <div className="bg-gray-100 p-4 rounded-md">
            <code className="text-sm text-indigo-600">
              {apiBaseUrl}/api/qr/generate?data=https://example.com&size=300
            </code>
          </div>
          <p className="text-sm text-gray-700 mt-4">
            For higher rate limits and advanced features, consider upgrading to a <button type="button" className="text-indigo-600 hover:text-indigo-800">Pro account</button>.
          </p>
        </div>
      </div>

      {/* API Endpoints */}
      <div className="space-y-10">
        {apiEndpoints.map((endpoint) => (
          <div key={endpoint.id} id={endpoint.id} className="bg-white shadow overflow-hidden rounded-lg">
            <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
              <h2 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
                <span className="mr-2 px-2 py-1 text-xs font-medium rounded bg-indigo-100 text-indigo-800">
                  {endpoint.method}
                </span>
                {endpoint.name}
              </h2>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                {endpoint.endpoint}
              </p>
            </div>
            
            <div className="px-4 py-5 sm:p-6">
              <p className="text-sm text-gray-700 mb-6">
                {endpoint.description}
              </p>
              
              {/* Parameters */}
              <div className="mb-6">
                <h3 className="text-md font-medium text-gray-900 mb-3">Parameters</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Type
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Required
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Description
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {endpoint.parameters.map((param, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {param.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {param.type}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {param.required ? 'Yes' : 'No'}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {param.description}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              {/* Example Request */}
              <div className="mb-6">
                <h3 className="text-md font-medium text-gray-900 mb-3">Example Request</h3>
                <div className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                  {typeof endpoint.exampleRequest === 'string' ? (
                    <code className="text-sm text-indigo-600 whitespace-pre-wrap">
                      {endpoint.exampleRequest}
                    </code>
                  ) : (
                    <pre className="text-sm text-indigo-600 whitespace-pre-wrap">
                      {JSON.stringify(endpoint.exampleRequest, null, 2)}
                    </pre>
                  )}
                </div>
              </div>
              
              {/* Example Response */}
              <div className="mb-6">
                <h3 className="text-md font-medium text-gray-900 mb-3">Example Response</h3>
                <div className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                  <pre className="text-sm text-indigo-600 whitespace-pre-wrap">
                    {JSON.stringify(endpoint.exampleResponse, null, 2)}
                  </pre>
                </div>
              </div>
              
              {/* Code Snippets */}
              <div>
                <h3 className="text-md font-medium text-gray-900 mb-3">Code Examples</h3>
                <div className="border border-gray-200 rounded-md">
                  <div className="border-b border-gray-200">
                    <nav className="-mb-px flex" aria-label="Tabs">
                      {Object.keys(endpoint.codeSnippets).map((language, index) => (
                        <button
                          key={language}
                          onClick={() => {
                            const tabButtons = document.querySelectorAll(`#tabs-${endpoint.id} button`);
                            const tabPanels = document.querySelectorAll(`#tabPanels-${endpoint.id} div`);
                            
                            tabButtons.forEach(button => {
                              button.classList.remove('border-indigo-500', 'text-indigo-600');
                              button.classList.add('border-transparent', 'text-gray-500');
                            });
                            
                            tabPanels.forEach(panel => {
                              panel.classList.add('hidden');
                            });
                            
                            document.querySelector(`#tab-${endpoint.id}-${language}`).classList.remove('border-transparent', 'text-gray-500');
                            document.querySelector(`#tab-${endpoint.id}-${language}`).classList.add('border-indigo-500', 'text-indigo-600');
                            
                            document.querySelector(`#panel-${endpoint.id}-${language}`).classList.remove('hidden');
                          }}
                          id={`tab-${endpoint.id}-${language}`}
                          className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                            index === 0
                              ? 'border-indigo-500 text-indigo-600'
                              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                          }`}
                        >
                          {language.charAt(0).toUpperCase() + language.slice(1)}
                        </button>
                      ))}
                    </nav>
                  </div>
                  
                  <div id={`tabPanels-${endpoint.id}`}>
                    {Object.entries(endpoint.codeSnippets).map(([language, code], index) => (
                      <div
                        key={language}
                        id={`panel-${endpoint.id}-${language}`}
                        className={index === 0 ? '' : 'hidden'}
                      >
                        <div className="relative">
                          <button
                            onClick={() => copyToClipboard(code, `${endpoint.id}-${language}`)}
                            className="absolute top-2 right-2 p-2 text-gray-500 hover:text-gray-700 bg-white rounded-md shadow-sm border border-gray-200"
                            title="Copy to clipboard"
                          >
                            {copiedSnippet === `${endpoint.id}-${language}` ? (
                              <FaCheckCircle className="h-5 w-5 text-green-500" />
                            ) : (
                              <FaCopy className="h-5 w-5" />
                            )}
                          </button>
                          <SyntaxHighlighter
                            language={language}
                            style={atomDark}
                            customStyle={{ margin: 0, borderRadius: '0 0 0.375rem 0.375rem' }}
                            showLineNumbers
                          >
                            {code}
                          </SyntaxHighlighter>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Usage Guidelines */}
      <div className="bg-white shadow overflow-hidden rounded-lg mt-10">
        <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
          <h2 className="text-lg leading-6 font-medium text-gray-900">Usage Guidelines</h2>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Best practices for using our QR code API.
          </p>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-md font-medium text-gray-900">Rate Limiting</h3>
              <p className="mt-1 text-sm text-gray-500">
                While we don't enforce strict rate limits on our open API, we recommend keeping requests under 100 per hour per IP address to ensure fair usage for all users.
              </p>
            </div>
            
            <div>
              <h3 className="text-md font-medium text-gray-900">Image Caching</h3>
              <p className="mt-1 text-sm text-gray-500">
                QR code images are cached for 24 hours. For frequently used QR codes, we recommend saving the generated image rather than making repeated API calls.
              </p>
            </div>
            
            <div>
              <h3 className="text-md font-medium text-gray-900">Error Handling</h3>
              <p className="mt-1 text-sm text-gray-500">
                Always implement proper error handling in your applications when using the API. Check the HTTP status code and error messages in the response.
              </p>
            </div>
            
            <div>
              <h3 className="text-md font-medium text-gray-900">Content Guidelines</h3>
              <p className="mt-1 text-sm text-gray-500">
                Do not use the API to generate QR codes that link to harmful, illegal, or offensive content. We reserve the right to block IPs that violate these guidelines.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiDocs;
