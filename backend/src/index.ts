import { Hono } from 'hono';
import { serveStatic } from 'hono/bun';
import register from './routes/authRoutes/notAuthenticated';
import pet from './routes/petRoutes/LostPetUpload';
import petProfile from './routes/petRoutes/petProfile';
import getPetImages from './routes/petRoutes/images';
import petAlert from './routes/petRoutes/petAlerts';
import communitySearcher from './routes/petRoutes/communitySearcher';
import petAlerProfile from './routes/petRoutes/AlertProfile/profile';
import openai from './routes/ai.routes';

const app = new Hono();

app.use('/static/*', serveStatic({ root: './' }));
app.route('/auth', register);
app.route('/upload/pet', pet);
app.route('/pet-profile', petProfile);
app.route('/user-pet-images', getPetImages);
app.route('/community-searcher', communitySearcher);
app.route('/pet-alert-profile', petAlerProfile);
app.route('/pet-alert', petAlert);
app.route('/openai', openai);

export default {
  port: 8080,
  fetch: app.fetch,
};
