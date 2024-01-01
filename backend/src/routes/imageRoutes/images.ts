import { Hono } from 'hono';
import { getPetImages } from '../../sql/petImages';

const app = new Hono();

app.post('/', async c => {
  const body = await c.req.json();
  const { userid } = body;
  console.log(userid);
  const images = await getPetImages(userid);
  console.log(images);
  return c.json({
    images,
    test: 'test',
  });
});

export default app;
