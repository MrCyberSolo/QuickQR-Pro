import { QRCodeSVG } from "qrcode.react";

/**
 * Utility function to generate QR code with customization options
 * @param {string} text - The content to encode in the QR code
 * @param {object} options - Customization options for the QR code
 * @returns {JSX.Element} QR code component
 */
export const QRPreview = ({ text, options = {} }) => {
  const {
    size = 256,
    bgColor = "#FFFFFF",
    fgColor = "#000000",
    level = "L",
    includeMargin = true,
    imageSettings,
  } = options;

  return (
    <QRCodeSVG
      value={text || "https://example.com"}
      size={size}
      bgColor={bgColor}
      fgColor={fgColor}
      level={level}
      includeMargin={includeMargin}
      imageSettings={imageSettings}
    />
  );
};

/**
 * Generate QR code data for different content types
 * @param {string} type - Type of QR code (url, wifi, vcard, etc.)
 * @param {object} data - Data for the QR code
 * @returns {string} Formatted string for QR code
 */
export const generateQRData = (type, data) => {
  switch (type) {
    case "url":
      return data.url || "";
    
    case "wifi":
      return `WIFI:S:${data.ssid};T:${data.encryption || "WPA"};P:${data.password};;`;
    
    case "vcard":
      return `BEGIN:VCARD
VERSION:3.0
N:${data.lastName || ""};${data.firstName || ""}
FN:${data.firstName || ""} ${data.lastName || ""}
TEL;TYPE=CELL:${data.phone || ""}
EMAIL:${data.email || ""}
URL:${data.website || ""}
ADR:;;${data.street || ""};${data.city || ""};${data.state || ""};${data.zip || ""};${data.country || ""}
END:VCARD`;
    
    case "email":
      return `mailto:${data.email}?subject=${encodeURIComponent(data.subject || "")}&body=${encodeURIComponent(data.body || "")}`;
    
    case "sms":
      return `sms:${data.phone}${data.message ? `?body=${encodeURIComponent(data.message)}` : ""}`;
    
    case "geo":
      return `geo:${data.latitude},${data.longitude}`;
    
    default:
      return data.text || "";
  }
};

const QRUtils = {
  QRPreview,
  generateQRData
};

export default QRUtils;
