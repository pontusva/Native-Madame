import { Hono } from 'hono';
import { community_searchers } from '../../postgresjs/pet';

const app = new Hono();

app.get('/', async c => {
  const cs = await community_searchers();

  return c.json({
    cs,
  });
});

export default app;
