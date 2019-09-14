import SplashImage from '../resources/img/seo/home-splash-screen.png';

export default [
  {
    path: '/',
    exact: true,
    component: () => import('../components/splash'),
    seo: {
      title: 'AskEUs: A friendly chatbot for EU',
      description: 'A friendly chatbot for getting the valid source of information about European Union',
      image: SplashImage,
    },
  },
];
