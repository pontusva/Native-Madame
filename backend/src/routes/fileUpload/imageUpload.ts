import { Hono } from 'hono';

const app = new Hono();

app.post('/', async c => {
  const body = await c.req.formData();
  const file = body.get('photo') as File; // Cast the value to File type

  if (file) {
    const filePath = 'images/' + file.name;
    const bunFile = Bun.file(filePath);
    const writer = bunFile.writer();

    const buffer = new Uint8Array(await file.arrayBuffer());
    writer.write(buffer);
    writer.end();
  }

  return c.json({
    test: 'test',
    file: file?.name,
  });
});

export default app;
