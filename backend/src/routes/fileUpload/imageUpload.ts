import { Hono } from 'hono';

const app = new Hono();

app.post('/upload', async c => {
  const body = await c.req.parseBody();
  const file = body['file']; // File | string
  // Now you can handle the uploaded file
  // For example, you can save it to disk, store it in a database, etc.
});

export default app;
