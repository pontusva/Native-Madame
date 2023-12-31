import { Hono } from 'hono';
import register from './authRoutes/notAuthenticated';

const app = new Hono();

app.get('/hello', c => {
  return c.json({
    message: `Hello!`,
  });
});

app.route('/auth', register);

export default {
  port: 8080,
  fetch: app.fetch,
};
