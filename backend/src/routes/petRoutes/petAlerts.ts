import { Hono } from 'hono';
import { petAlert, addCommunitySearcher } from '../../postgresjs/pet';

const app = new Hono();

app.get('/', async c => {
  const alert = await petAlert();

  return c.json({
    alert,
  });
});

app.post('/add-community-searcher', async c => {
  const { pet_id, user_uid } = await c.req.json();

  const addedCommunitySearcher = await addCommunitySearcher(pet_id, user_uid);

  return c.json({
    addedCommunitySearcher,
  });
});

export default app;
