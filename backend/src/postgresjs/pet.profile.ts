import sql from './db';

export async function petProfile(petId: string, owner_id: string) {
  const lastSeen = await sql`
  SELECT pets.*, last_seen.*, images.image_name 
  FROM pets 
  JOIN last_seen ON pets.id = last_seen.pet_id 
  LEFT JOIN images ON pets.id = images.pet_id
  WHERE pets.id = ${petId} AND pets.owner_uid = ${owner_id};
`;

  return lastSeen;
}
