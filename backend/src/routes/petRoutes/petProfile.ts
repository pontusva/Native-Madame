import { Hono } from 'hono';
import { petProfile } from '../../postgresjs/pet.profile';

const app = new Hono();

app.get('/:petid/:userid', async c => {
  const param = c.req.param();
  const specificPet = await petProfile(param.petid, param.userid);

  return c.json({
    specificPet,
  });
});

export default app;
