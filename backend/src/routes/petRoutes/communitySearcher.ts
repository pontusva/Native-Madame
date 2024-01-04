import { Hono } from 'hono';
import { community_searchers } from '../../postgresjs/pet';

const app = new Hono();

app.get('/:uid', async c => {
  const body = c.req.param();
  const cs = await community_searchers(body.uid);

  return c.json({
    cs,
  });
});

export default app;
