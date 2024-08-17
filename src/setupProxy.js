import { RequestHandler } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const proxy: RequestHandler = createProxyMiddleware({
  target: 'https://109.237.99.151:3000/',
  changeOrigin: true,
});

export default function(app) {
  app.use('/', proxy);
}