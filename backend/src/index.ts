import { Hono } from 'hono';

const app = new Hono();

app.get('/hello', c => {
  return c.json({
    message: `Hello!`,
  });
});

export default {
  port: 8080,
  fetch: app.fetch,
};
