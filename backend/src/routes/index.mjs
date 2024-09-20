import path from 'node:path';
import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import productsRouter from './products.mjs';
import categoriesRouter from './categories.mjs';
import { fileURLToPath } from 'url';

const router = express.Router();

const getPaths = () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  return {
    publicPath: path.resolve(__dirname, '../../../frontend/build'),
    webpackDevServerURL: 'http://frontend:3000',
  };
};

const setupRoutes = (router) => {
  const { webpackDevServerURL } = getPaths();

  if (process.env.NODE_ENV === 'development') {
    // In development mode, it's forwarding requests to webpack-dev-server
    router.use('*', createProxyMiddleware({
      target: webpackDevServerURL,
      changeOrigin: true,
    }));
  }
};

router.use('/api/products', productsRouter);
router.use('/api/categories', categoriesRouter);

setupRoutes(router);

export default router;

