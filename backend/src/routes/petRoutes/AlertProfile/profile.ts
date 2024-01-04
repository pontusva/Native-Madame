import { Hono } from 'hono';
import { getPetAlertProfile } from '../../../postgresjs/petAlertProfile';

const app = new Hono();

app.get('/:petid', async c => {
  const param = c.req.param();
  const profile = await getPetAlertProfile(param.petid);

  return c.json({
    profile,
  });
});

export default app;
