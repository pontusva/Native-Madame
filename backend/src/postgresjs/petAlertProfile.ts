import sql from './db';

export async function getPetAlertProfile(petId: string) {
  const petAlertProfile = await sql`
    SELECT p.*, i.image_name
    FROM pets p
    LEFT JOIN images i ON p.id = i.pet_id
    WHERE p.id = ${petId};
  `;

  return petAlertProfile;
}
