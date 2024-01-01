import { Hono } from 'hono';
import sql from '../../sql/db';

const app = new Hono();

app.post('/', async c => {
  const body = await c.req.formData();
  const file = body.get('photo') as File; // Cast the value to File type

  if (file) {
    const filePath = 'static/' + file.name;
    const bunFile = Bun.file(filePath);
    const writer = bunFile.writer();

    const buffer = new Uint8Array(await file.arrayBuffer());
    writer.write(buffer);
    writer.end();
  }

  const mockDate = new Date().toISOString();

  await sql.begin(async sql => {
    const [pet] = await sql`
      INSERT INTO pets (
        name,
        type,
        description,
        date_lost,
        owner_uid
      ) VALUES (
        ${String(body.get('name'))},
        ${String(body.get('type'))},
        ${String(body.get('description'))},
        ${mockDate},
        ${String(body.get('owner_uid'))}  
      )
      RETURNING *
    `;

    if (file) {
      const [image] = await sql`
        INSERT INTO images (
          pet_id,
          image_name
        ) VALUES (
          ${pet.id},
          ${String(file.name)}
        )
        RETURNING *
      `;

      return [pet, image];
    }

    // Return pet and a placeholder value for image
    return [pet, null];
  });

  return c.json({
    test: 'test',
    file: file?.name,
  });
});

export default app;
