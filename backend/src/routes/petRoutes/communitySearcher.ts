import { Hono } from 'hono';
import { community_searchers } from '../../postgresjs/pet';
import { replyComment } from '../../postgresjs/petAlertProfile';

const app = new Hono();

app.get('/:uid', async c => {
  const body = c.req.param();
  const cs = await community_searchers(body.uid);

  return c.json({
    cs,
  });
});

app.post('/comments', async c => {
  const body = await c.req.json();
  const threadId = body.thread_id;
  const userUid = body.user_uid;
  const commentText = body.content;
  const commentId = body.comment_id;

  const comment = await replyComment(threadId, userUid, commentText, commentId);

  return c.json({ comment });
});

export default app;
