/* eslint-disable @next/next/inline-script-id */
import Script from 'next/script';
import React from 'react';

const GoogleAnalyticsScript = () => {
  return (
    <>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-GE81HPJ7XS"
      ></Script>
      <Script id="google-analytics">
        {`window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-GE81HPJ7XS');
        gtag('config', 'AW-11362928051');`}
      </Script>
    </>
  );
};

export default GoogleAnalyticsScript;
