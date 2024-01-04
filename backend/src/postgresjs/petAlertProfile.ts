import sql from './db';

export async function getPetAlertProfile(petId: string) {
  const petAlertProfile = await sql`
  SELECT p.*, i.image_name, t.id as thread_id
  FROM pets p
  LEFT JOIN images i ON p.id = i.pet_id
  LEFT JOIN threads t ON p.id = t.pet_id
  WHERE p.id = ${petId};
`;

  return petAlertProfile;
}
