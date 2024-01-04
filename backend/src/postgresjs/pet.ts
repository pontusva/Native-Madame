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
    SELECT p.*, i.image_name
    FROM pets p
    JOIN (
      SELECT owner_uid, MAX(created_at) as latest
      FROM pets
      GROUP BY owner_uid
    ) latest_pets ON p.owner_uid = latest_pets.owner_uid AND p.created_at = latest_pets.latest
    LEFT JOIN images i ON p.id = i.pet_id;
  `;

  return alert;
}

export async function community_searchers(uid: string) {
  const searchers = await sql`
  SELECT DISTINCT ON (p.id) cs.*, u.*, p.*, i.image_name
  FROM community_searchers cs
  JOIN users u ON cs.user_uid = u.uid
  JOIN pets p ON cs.pet_id = p.id
  JOIN images i ON p.id = i.pet_id
  JOIN threads t ON p.id = t.pet_id
  JOIN comments c ON t.id = c.thread_id
  WHERE c.user_uid = ${uid};
  `;

  return searchers;
}
