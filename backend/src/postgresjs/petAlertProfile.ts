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

export async function replyComment(
  threadId: number,
  userUid: string,
  commentText: string,
  commentId: number
) {
  const [comment] = await sql`
    INSERT INTO comments (
      thread_id,
      user_uid,
      content,
      parent_comment_id 
    ) VALUES (
      ${threadId},
      ${userUid},
      ${commentText},
      ${commentId}
    )
    RETURNING *
  `;

  return comment;
}

export async function getNestedComments(parent_comment_id: string) {
  const replies = await sql`
    SELECT id, thread_id, parent_comment_id, user_uid, content, created_at
    FROM comments
    WHERE parent_comment_id = ${parent_comment_id}
    ORDER BY created_at;
  `;

  return replies;
}

export async function getComments(thread_id: string) {
  const comments = await sql`
  SELECT comments.*, users.username 
  FROM comments 
  JOIN users ON comments.user_uid = users.uid 
  WHERE thread_id = ${thread_id} AND parent_comment_id IS NULL
  ORDER BY comments.created_at DESC;
  `;
  return comments;
}
