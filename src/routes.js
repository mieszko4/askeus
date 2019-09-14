import GuestRoutes from './pages/guest';
import SplashScreen from './pages/splash';

import AskeusIcon from './resources/img/askeus.png';
import AskeusSmallIcon from './resources/img/askeus-small.png';

export default class Routes {
  // eslint-disable-next-line
  apply(routeHandler) {
    routeHandler.setPwaSchema({
      name: 'AskEUs',
      short_name: 'AskEUs',
      description: 'A friendly chatbot for getting the valid source of information about European Union',
      lang: 'en-US',
      dir: 'ltr',

      icons: [
        {
          src: AskeusSmallIcon,
          sizes: '192x192',
        },
        {
          src: AskeusIcon,
          sizes: '512x512',
        },
      ],

      orientation: 'any',
      start_url: '/?utm_source=pwa',
      scope: '/',
      background_color: '#003399',
      theme_color: '#003399',
      display: 'standalone',
    });
    routeHandler.setDefaultSeoSchema({
      title: 'AskEUs',
    });

    const routes = [
      ...GuestRoutes,
      ...SplashScreen,
    ];

    routeHandler.hooks.initRoutes.tapPromise('AppRoutes', async () => {
      routeHandler.addRoutes(routes);
    });
  }
}
