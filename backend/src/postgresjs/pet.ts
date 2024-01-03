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
