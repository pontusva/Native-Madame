import { Hono } from 'hono';
import sql from '../../postgresjs/db';
import { lastSeen } from '../../postgresjs/pet';

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

  await sql`
  INSERT INTO threads (
    pet_id,
    user_uid,
    title
  ) VALUES (
    ${pet.id},
    ${String(body.get('owner_uid'))},
    'Discussion for ' || ${String(body.get('name'))}
  )
`;

  if (file) {
    const result = lastSeen(
      pet.id,
      String(body.get('owner_uid')),
      String(body.get('latLng'))
    );

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
  }

  await sql`
  INSERT INTO community_searchers (
    pet_id,
    user_uid
  ) VALUES (
    ${pet.id},
    ${String(body.get('owner_uid'))}
  )
  `;

  // Return pet and a placeholder value for image

  return c.json({
    pet,
  });
});

export default app;
