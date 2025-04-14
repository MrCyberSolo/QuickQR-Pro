import React, { useEffect, useRef } from 'react';
import adsConfig from '../config/adsConfig';

// Keep track of initialized ad slots to prevent duplicate initialization
const initializedAds = new Set();

const GoogleAdsense = ({ adUnitId, client, slot, format, responsive, style }) => {
  // Create a unique ID for this ad instance
  const adRef = useRef(null);
  const uniqueId = useRef(`ad-${adUnitId || 'custom'}-${Math.random().toString(36).substring(2, 11)}`);
  const initialized = useRef(false);
  // If adUnitId is provided, use configuration from adsConfig
  const adUnit = adUnitId ? adsConfig.adUnits[adUnitId] : null;
  
  // Use provided values or fall back to adUnit values or defaults
  const adClient = client || adsConfig.publisherId;
  const adSlot = slot || (adUnit ? adUnit.slot : '');
  const adFormat = format || (adUnit ? adUnit.format : 'auto');
  const adResponsive = responsive !== undefined ? responsive : (adUnit ? adUnit.responsive : true);
  const adStyle = style || (adUnit ? adUnit.style : { display: 'block', textAlign: 'center' });
  
  // Check if ads are globally enabled
  const adsEnabled = adsConfig.settings.enabled;
  useEffect(() => {
    // If ads are disabled globally, don't proceed
    if (!adsEnabled) return;
    
    // Only add the script if it doesn't exist
    const hasScript = document.querySelector(`script[src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adClient}"]`);
    
    if (!hasScript) {
      const script = document.createElement('script');
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adClient}`;
      script.async = true;
      script.crossOrigin = 'anonymous';
      document.head.appendChild(script);
    }

    // Only initialize this ad if it hasn't been initialized yet
    const currentId = uniqueId.current;
    if (!initializedAds.has(currentId) && adRef.current && !initialized.current) {
      initialized.current = true;
      initializedAds.add(currentId);
      
      // Wait for the AdSense script to load
      const tryPushAd = () => {
        if (window.adsbygoogle) {
          try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
          } catch (error) {
            console.error('AdSense error:', error);
          }
        } else {
          // If AdSense isn't loaded yet, try again in 50ms
          setTimeout(tryPushAd, 50);
        }
      };
      
      // Start trying to push the ad
      tryPushAd();
    }
    
    // Cleanup function to remove this ad from the initialized set when component unmounts
    return () => {
      initializedAds.delete(currentId);
      initialized.current = false;
    };
  }, [adClient, adsEnabled]);

  // If ads are disabled globally, return null or a placeholder
  if (!adsEnabled) {
    return adsConfig.settings.testMode ? (
      <div className="google-adsense-placeholder" style={{ 
        ...adStyle, 
        backgroundColor: '#f0f0f0', 
        border: '1px dashed #ccc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        color: '#666'
      }}>
        <p>Ad Placeholder ({adUnitId || 'custom'})</p>
      </div>
    ) : null;
  }

  return (
    <div className="google-adsense-container" id={uniqueId.current}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={adStyle}
        data-ad-client={adClient}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={adResponsive ? 'true' : 'false'}
      />
    </div>
  );
};

export default GoogleAdsense;
