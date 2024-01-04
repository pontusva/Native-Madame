import { Hono } from 'hono';
import {
  getPetAlertProfile,
  addComment,
  getComments,
} from '../../../postgresjs/petAlertProfile';

const app = new Hono();

app.get('/:petid', async c => {
  const param = c.req.param();
  const profile = await getPetAlertProfile(param.petid);

  return c.json({
    profile,
  });
});

app.post('/comments', async c => {
  const body = await c.req.json();
  const threadId = body.thread_id;
  const userUid = body.user_uid;
  const commentText = body.content;

  const comment = await addComment(threadId, userUid, commentText);

  return c.json({ comment });
});

app.get('/comments/:thread_id', async c => {
  const param = c.req.param();
  console.log(param);
  const comments = await getComments(param.thread_id);

  return c.json({ comments });
});

export default app;
