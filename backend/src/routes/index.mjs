// import path from 'node:path';
// import express from 'express';
// import { createProxyMiddleware } from 'http-proxy-middleware';
// import homeRouter from './home.mjs';
// import productsRouter from './products.mjs';
// import categoriesRouter from './categories.mjs';
// import { fileURLToPath } from 'url';

// const router = express.Router();

// router.use('/', homeRouter);
// router.use('/products', productsRouter);
// router.use('/categories', categoriesRouter);

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const publicPath = path.resolve(__dirname, '../../../frontend/build');

// if (process.env.NODE_ENV === 'production') {
//     router.use(express.static(publicPath));

//     router.get('*', (req, res) => {
//       res.sendFile(path.join(publicPath, 'index.html'));
//     });
// } else {
//     const webpackDevServerURL = 'http://frontend:3000';

//     router.use('*', createProxyMiddleware({
//       target: webpackDevServerURL,
//       changeOrigin: true,
//     }));
// }

// export default router;

import path from 'node:path';
import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import homeRouter from './home.mjs';
import productsRouter from './products.mjs';
import categoriesRouter from './categories.mjs';
import { fileURLToPath } from 'url';

const router = express.Router();

// Функция для получения путей
const getPaths = () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  return {
    publicPath: path.resolve(__dirname, '../../../frontend/build'),
    webpackDevServerURL: 'http://frontend:3000',
  };
};

// Функция для настройки роутов в зависимости от режима окружения
const setupRoutes = (router) => {
  const { publicPath, webpackDevServerURL } = getPaths();

  if (process.env.NODE_ENV === 'production') {
    router.use(express.static(publicPath));

    router.get('*', (req, res) => {
      res.sendFile(path.join(publicPath, 'index.html'));
    });
  } else {
    router.use('*', createProxyMiddleware({
      target: webpackDevServerURL,
      changeOrigin: true,
    }));
  }
};

// Основные роуты приложения
router.use('/', homeRouter);
router.use('/products', productsRouter);
router.use('/categories', categoriesRouter);

// Настройка роутов в зависимости от режима
setupRoutes(router);

export default router;

