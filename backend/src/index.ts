import { Hono } from 'hono';
import { serveStatic } from 'hono/bun';
import register from './routes/authRoutes/notAuthenticated';
import pet from './routes/fileUpload/imageUpload';

const app = new Hono();

app.get('/hello', c => {
  return c.json({
    message: `Hello!`,
  });
});

app.use('/static/*', serveStatic({ root: './' }));
app.route('/auth', register);
app.route('/upload/pet', pet);

export default {
  port: 8080,
  fetch: app.fetch,
};
