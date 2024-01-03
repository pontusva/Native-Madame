import sql from './db';

export async function getUser(user_id: string) {
  const users = await sql`
  SELECT * FROM users WHERE users.uid = ${user_id}
`;

  return users;
}
