import { RequestHandler } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const proxy: RequestHandler = createProxyMiddleware({
  target: 'https://total.miketoken.me/',
  changeOrigin: true,
});

export default function(app) {
  app.use('/', proxy);
}