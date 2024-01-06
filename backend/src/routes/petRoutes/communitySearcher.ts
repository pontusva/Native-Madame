import { Hono } from 'hono';
import { community_searchers } from '../../postgresjs/pet';
import {
  replyComment,
  getNestedComments,
} from '../../postgresjs/petAlertProfile';

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

app.get('/comments/:comment_id', async c => {
  const param = c.req.param();
  console.log(param.comment_id);
  const comments = await getNestedComments(param.comment_id);

  return c.json({ comments });
});

export default app;
