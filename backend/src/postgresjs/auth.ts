import sql from './db';

interface RegisterBody {
  username: string;
  email: string;
  name: string;
  uid: string;
}

export async function insertUser({ name, username, email, uid }: RegisterBody) {
  const users = await sql`
    insert into users
      (name, username, email, uid)
    values
      (${name}, ${username}, ${email}, ${uid})
    returning *
  `;

  return users;
}
