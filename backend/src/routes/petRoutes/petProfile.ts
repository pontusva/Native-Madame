import { Hono } from 'hono';
import { petProfile } from '../../postgresjs/pet.profile';

const app = new Hono();

app.get('/:petid/:userid', async c => {
  const param = c.req.param();
  const images = await petProfile(param.petid, param.userid);

  return c.json({
    images,
    test: 'test',
  });
});

export default app;
