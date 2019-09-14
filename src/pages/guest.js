import CSSGlobalLocalImage from '../resources/img/seo/css-global-local.png';

export default [
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
