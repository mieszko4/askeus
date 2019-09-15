import React from 'react';
import AskeusIcon from './resources/img/askeus.png';

export default class Server {
  // eslint-disable-next-line
  apply(serverHandler) {
    serverHandler.hooks.beforeHtmlRender.tapPromise('DSNPreCache', async (Application) => {
      const { htmlProps: { head } } = Application;
      head.push(<link key="dns-precache-google-analytics" rel="preconnect" href="https://www.google-analytics.com" />);
      head.push(<link key="dns-precache-googletagmanager" rel="preconnect" href="https://www.googletagmanager.com" />);
      head.push(<meta key="meta-theme-color" name="theme-color" content="#003399" />);
    });

    serverHandler.hooks.beforeHtmlRender.tapPromise('AddFavIcon', async (Application) => {
      const { htmlProps: { head } } = Application;
      head.push(<link key="favicon" rel="shortcut icon" type="image/png" href={AskeusIcon} />);
      return true;
    });

    serverHandler.hooks.beforeHtmlRender.tapPromise('AddServiceWoker', async (Application) => {
      Application.htmlProps.footer.push(<script
        key="serviceWorker"
        // eslint-disable-next-line
        dangerouslySetInnerHTML={{
          __html: `if('serviceWorker' in navigator) {
              navigator.serviceWorker.register('/static/sw.js');
            }`,
        }}
      />);
    });

    serverHandler.hooks.beforeHtmlRender.tapPromise('AddGoogleTracking', async (Application) => {
      Application.htmlProps.footer.push(<script async key="googleanalyticslink" src="https://www.googletagmanager.com/gtag/js?id=UA-148057726-1" />);
      Application.htmlProps.footer.push(<script
        key="googleanalyticsscript"
        // eslint-disable-next-line
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'UA-148057726-1');`,
        }}
      />);
    });
  }
}
