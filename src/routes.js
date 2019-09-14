import GuestRoutes from './pages/guest';
import SplashScreen from './pages/splash';

import AskeusIcon from './resources/img/askeus.png';

export default class Routes {
  // eslint-disable-next-line
  apply(routeHandler) {
    routeHandler.setPwaSchema({
      name: 'AskEUs',
      short_name: 'AskEUs',
      icons: [
        {
          src: AskeusIcon,
          type: 'image/png',
          sizes: '512x512',
        },
      ],
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
