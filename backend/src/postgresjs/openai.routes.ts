import sql from './db';

export async function updateUserWithThreadAndAssistantId(
  thread_id: string,
  assistant_id: string,
  user_id: string
) {
  const users = await sql`
  UPDATE users
  SET ai_thread_id = ${thread_id}, ai_assistant_id = ${assistant_id}
  WHERE uid = ${user_id}
  RETURNING *
`;

  return users;
}
