import CSSGlobalLocalImage from '../resources/img/seo/css-global-local.png';

export default [
  {
    path: '/chat',
    exact: true,
    component: () => import('../components/chat'),
    seo: {
      title: 'Chat | AskEUs',
      description: 'Ask anything regarding European Union - protect yourself from fake news',
      image: CSSGlobalLocalImage,
    },
  },
];
