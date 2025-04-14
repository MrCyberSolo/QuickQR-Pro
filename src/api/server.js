const express = require('express');
const cors = require('cors');
const QRCode = require('qrcode');
const path = require('path');
const fs = require('fs');

// Create Express app
const app = express();
const PORT = process.env.PORT || 3002;



// Enable CORS for all routes with specific options
app.use(cors({
  origin: ['http://dynamic-balancig.com', 'http://dynamic-balancig.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Handle preflight requests with the same CORS settings

// Parse JSON body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, '../../public')));

// Create a directory for storing generated QR codes
const qrImagesDir = path.join(__dirname, 'qr-images');
if (!fs.existsSync(qrImagesDir)) {
  fs.mkdirSync(qrImagesDir, { recursive: true });
}

// Define the path for site configuration
const CONFIG_PATH = path.resolve(__dirname, '../data/siteConfig.json');
console.log('Config path:', CONFIG_PATH);

// Ensure the data directory exists
const dataDir = path.dirname(CONFIG_PATH);
if (!fs.existsSync(dataDir)) {
  console.log('Creating data directory:', dataDir);
  fs.mkdirSync(dataDir, { recursive: true });
}

// Helper function to generate QR code
const generateQRCode = async (data, options = {}) => {
  const defaultOptions = {
    errorCorrectionLevel: 'H',
    type: 'image/png',
    quality: 0.92,
    margin: 1,
    color: {
      dark: '#000000',
      light: '#FFFFFF'
    }
  };

  const mergedOptions = { ...defaultOptions, ...options };
  
  try {
    const qrImage = await QRCode.toDataURL(data, mergedOptions);
    return qrImage;
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw error;
  }
};

// QR Code generation endpoint
app.get('/api/qr/generate', async (req, res) => {
  try {
    const { data, size = 300, format = 'png', foreground = '#000000', background = '#FFFFFF' } = req.query;
    
    if (!data) {
      return res.status(400).json({ error: 'Missing required parameter: data' });
    }
    
    const options = {
      width: parseInt(size, 10),
      type: format === 'svg' ? 'svg' : 'image/png',
      color: {
        dark: foreground,
        light: background
      }
    };
    
    const qrImage = await generateQRCode(data, options);
    
    if (format === 'json') {
      res.json({ qrcode: qrImage });
    } else {
      // For direct image response, we need to convert the data URL to a buffer
      const imageData = qrImage.replace(/^data:image\/png;base64,/, '');
      const imageBuffer = Buffer.from(imageData, 'base64');
      
      res.set('Content-Type', 'image/png');
      res.send(imageBuffer);
    }
  } catch (error) {
    console.error('Error handling QR code generation request:', error);
    res.status(500).json({ error: 'Failed to generate QR code' });
  }
});

// Type-specific QR code generation endpoints
app.get('/api/qr/type/:type', async (req, res) => {
  try {
    const { type } = req.params;
    const { size = 300, format = 'png', foreground = '#000000', background = '#FFFFFF' } = req.query;
    
    let data;
    let error = null;
    
    // Validate and construct data based on type
    switch (type) {
      case 'url':
        const { url } = req.query;
        if (!url) {
          error = 'Missing required parameter: url';
        } else {
          data = url;
        }
        break;
        
      case 'wifi':
        const { ssid, password, encryption = 'WPA' } = req.query;
        if (!ssid) {
          error = 'Missing required parameter: ssid';
        } else {
          data = `WIFI:S:${ssid};T:${encryption};P:${password || ''};;`;
        }
        break;
        
      case 'vcard':
        const { name, phone, email, company, title, url: website } = req.query;
        if (!name) {
          error = 'Missing required parameter: name';
        } else {
          data = 'BEGIN:VCARD\nVERSION:3.0\n';
          data += `FN:${name}\n`;
          if (phone) data += `TEL:${phone}\n`;
          if (email) data += `EMAIL:${email}\n`;
          if (company) data += `ORG:${company}\n`;
          if (title) data += `TITLE:${title}\n`;
          if (website) data += `URL:${website}\n`;
          data += 'END:VCARD';
        }
        break;
        
      case 'email':
        const { address, subject, body } = req.query;
        if (!address) {
          error = 'Missing required parameter: address';
        } else {
          data = `mailto:${address}`;
          const params = [];
          if (subject) params.push(`subject=${encodeURIComponent(subject)}`);
          if (body) params.push(`body=${encodeURIComponent(body)}`);
          if (params.length > 0) {
            data += `?${params.join('&')}`;
          }
        }
        break;
        
      case 'sms':
        const { phone: phoneNumber, message } = req.query;
        if (!phoneNumber) {
          error = 'Missing required parameter: phone';
        } else {
          data = `sms:${phoneNumber}`;
          if (message) {
            data += `?body=${encodeURIComponent(message)}`;
          }
        }
        break;
        
      case 'geo':
        const { lat, lng, q } = req.query;
        if (q) {
          data = `geo:0,0?q=${encodeURIComponent(q)}`;
        } else if (lat && lng) {
          data = `geo:${lat},${lng}`;
        } else {
          error = 'Missing required parameters: either lat and lng, or q';
        }
        break;
        
      default:
        error = `Unsupported QR code type: ${type}`;
    }
    
    if (error) {
      return res.status(400).json({ error });
    }
    
    const options = {
      width: parseInt(size, 10),
      type: format === 'svg' ? 'svg' : 'image/png',
      color: {
        dark: foreground,
        light: background
      }
    };
    
    const qrImage = await generateQRCode(data, options);
    
    if (format === 'json') {
      res.json({ qrcode: qrImage });
    } else {
      // For direct image response, we need to convert the data URL to a buffer
      const imageData = qrImage.replace(/^data:image\/png;base64,/, '');
      const imageBuffer = Buffer.from(imageData, 'base64');
      
      res.set('Content-Type', 'image/png');
      res.send(imageBuffer);
    }
  } catch (error) {
    console.error('Error handling type-specific QR code generation:', error);
    res.status(500).json({ error: 'Failed to generate QR code' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Simple health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Import SEO optimizer utility
const seoOptimizer = require('../utils/seoOptimizer');

// Endpoint to get optimized SEO configuration
app.get('/api/seo', (req, res) => {
  try {
    // Get the page name from query parameter, default to 'home'
    const pageName = req.query.page || 'home';
    
    // Get SEO metadata for the specified page
    const seoMetadata = seoOptimizer.getPageSeoMetadata(pageName);
    
    if (!seoMetadata) {
      return res.status(404).json({ error: 'SEO configuration not found' });
    }
    
    res.json(seoMetadata);
  } catch (error) {
    console.error('Error getting SEO configuration:', error);
    res.status(500).json({ error: 'Failed to get SEO configuration' });
  }
});

// Endpoint to get SEO meta tags as HTML
app.get('/api/seo/meta-tags', (req, res) => {
  try {
    // Get the page name from query parameter, default to 'home'
    const pageName = req.query.page || 'home';
    
    // Get SEO metadata for the specified page
    const seoMetadata = seoOptimizer.getPageSeoMetadata(pageName);
    
    if (!seoMetadata) {
      return res.status(404).json({ error: 'SEO configuration not found' });
    }
    
    // Generate meta tags HTML
    const metaTags = seoOptimizer.generateMetaTags(seoMetadata);
    
    // Set content type to text/html
    res.setHeader('Content-Type', 'text/html');
    res.send(metaTags);
  } catch (error) {
    console.error('Error generating SEO meta tags:', error);
    res.status(500).json({ error: 'Failed to generate SEO meta tags' });
  }
});

// Endpoint to get structured data JSON-LD
app.get('/api/seo/structured-data', (req, res) => {
  try {
    // Get the page name from query parameter, default to 'home'
    const pageName = req.query.page || 'home';
    
    // Get SEO metadata for the specified page
    const seoMetadata = seoOptimizer.getPageSeoMetadata(pageName);
    
    if (!seoMetadata || !seoMetadata.structuredData) {
      return res.status(404).json({ error: 'Structured data not found' });
    }
    
    // Generate structured data script
    const structuredDataScript = seoOptimizer.generateStructuredDataScript(seoMetadata.structuredData);
    
    // Set content type to text/html
    res.setHeader('Content-Type', 'text/html');
    res.send(structuredDataScript);
  } catch (error) {
    console.error('Error generating structured data:', error);
    res.status(500).json({ error: 'Failed to generate structured data' });
  }
});



// Start the server
app.listen(PORT, () => {
  console.log(`QR Code API server running on port ${PORT}`);
});

module.exports = app;
