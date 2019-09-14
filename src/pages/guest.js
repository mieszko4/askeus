import CSSGlobalLocalImage from '../resources/img/seo/css-global-local.png';

export default [
  {
    path: '/global-local-css',
    exact: true,
    component: () => import('../components/global-local-css'),
    seo: {
      title: 'CSS - Globally & Locally | ReactPWA Demo',
      description: 'Sometimes we use global css classes like pad-10 but sometimes we need to write class names within modules that do not conflict with other modules, that is where local css comes into the picture',
      image: CSSGlobalLocalImage,
    },
  },
  {
    path: '/typescript-counter',
    exact: true,
    component: () => import('../components/typescript-counter'),
    seo: {
      title: 'TypeScript Counter | ReactPWA Demo',
      description: 'TypeScript is awesome and implementing it with React makes it more awesome. Checkout this simple counter example with react and typescript',
      image: CSSGlobalLocalImage,
    },
  },
];
