import sql from './db';

export async function getPetImages(userid: string) {
  const images = await sql`
  SELECT users.name AS user_name, pets.name AS pet_name, pets.id, images.image_name
  FROM users
  JOIN pets ON users.uid = pets.owner_uid
  JOIN images ON pets.id = images.pet_id
  WHERE users.uid = ${userid}
  `;

  return images;
}

export async function lastSeen(
  petId: string,
  userUid: string,
  location: string
) {
  const lastSeen = await sql`
  INSERT INTO last_seen (
    pet_id,
    user_uid,
    location
  ) VALUES (
    ${petId},
    ${userUid},
    ${location}
  )
  RETURNING *
`;

  return lastSeen;
}

export async function petAlert() {
  const alert = await sql`
  SELECT p.*
  FROM pets p
  JOIN (
  SELECT owner_uid, MAX(created_at) as latest
  FROM pets
  GROUP BY owner_uid
) latest_pets ON p.owner_uid = latest_pets.owner_uid AND p.created_at = latest_pets.latest;
  `;

  return alert;
}
