import sql from './db';

export async function petProfile(petId: string, owner_id: string) {
  const lastSeen = await sql`
  SELECT * 
  FROM pets 
  JOIN last_seen ON pets.owner_uid = last_seen.user_uid 
  WHERE pets.id = ${petId} AND pets.owner_uid = ${owner_id};  
`;

  return lastSeen;
}
