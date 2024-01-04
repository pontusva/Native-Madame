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
export async function addComment(
  threadId: number,
  userUid: string,
  commentText: string
) {
  const [comment] = await sql`
    INSERT INTO comments (
      thread_id,
      user_uid,
      content
    ) VALUES (
      ${threadId},
      ${userUid},
      ${commentText}
    )
    RETURNING *
  `;

  return comment;
}

export async function getComments(thread_id: string) {
  const comments = await sql`
  SELECT * FROM comments WHERE thread_id = ${thread_id} ORDER BY created_at DESC;
  `;
  return comments;
}
