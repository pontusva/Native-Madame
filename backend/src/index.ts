import { Hono } from 'hono';
import { serveStatic } from 'hono/bun';
import register from './routes/authRoutes/notAuthenticated';
import pet from './routes/petRoutes/LostPetUpload';
import getPetImages from './routes/petRoutes/images';
import openai from './routes/ai.routes';

const app = new Hono();

app.use('/static/*', serveStatic({ root: './' }));
app.route('/auth', register);
app.route('/upload/pet', pet);
app.route('/user-pet-images', getPetImages);
app.route('/openai', openai);

export default {
  port: 8080,
  fetch: app.fetch,
};
