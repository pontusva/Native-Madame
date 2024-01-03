import sql from './db';

export async function petProfile(petId: string, owner_id: string) {
  const lastSeen = await sql`
  SELECT * FROM pets WHERE id = ${petId} AND owner_id = ${owner_id}
`;

  return lastSeen;
}
