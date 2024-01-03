import { Hono } from 'hono';
import { getPetImages } from '../../sql/pet';

const app = new Hono();

app.get('/:userid', async c => {
  const param = c.req.param();
  const images = await getPetImages(param.userid);

  return c.json({
    images,
    test: 'test',
  });
});

export default app;
