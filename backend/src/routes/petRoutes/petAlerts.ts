import { Hono } from 'hono';
import { petAlert } from '../../postgresjs/pet';

const app = new Hono();

app.get('/', async c => {
  const alert = await petAlert();

  return c.json({
    alert,
  });
});

export default app;
