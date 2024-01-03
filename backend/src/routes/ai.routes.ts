import { Hono } from 'hono';
import { thread, main } from '../openai/init';
import { updateUserWithThreadAndAssistantId } from '../postgresjs/openai.routes';
import { getUser } from '../postgresjs/general';

const app = new Hono();

app.post('/oai-chat', async c => {
  const body = await c.req.json();
  const user_id = body.user_id;
  const chatMsg = body.chatMsg;

  const user = await getUser(user_id);
  const thread_id = user[0].ai_thread_id; // Access the thread_id property from the first row
  const assistant_id = user[0].ai_assistant_id; // Access the assistant_id property from the first row

  const messages = await main(thread_id, assistant_id, chatMsg);
  return c.json({ messages });
});

app.post('/create-or-get-thread/:userid', async c => {
  const body = c.req.param();
  const user_id = body.userid;

  // Get the user
  const user = await getUser(user_id);

  // If the user already has a thread, return it
  if (user && user[0].ai_thread_id) {
    return c.json({ thread_id: user[0].ai_thread_id, thread_exists: true });
  }

  // If the user does not have a thread, create a new one
  const threadData = await thread();
  const thread_id = threadData.thread.id;
  const assistant_id = threadData.assistant.id;

  const result = updateUserWithThreadAndAssistantId(
    thread_id,
    assistant_id,
    user_id
  );

  return c.json({ thread_id, result, thread_exists: false });
});

// app.post('/create-thread/:userid', async c => {
//   const body = c.req.param();
//   const user_id = body.userid;
//   const threadData = await thread();
//   const thread_id = threadData.thread.id;
//   const assistant_id = threadData.assistant.id;

//   const result = updateUserWithThreadAndAssistantId(
//     thread_id,
//     assistant_id,
//     user_id
//   );
//   console.log({ thread_id, assistant_id, user_id });
//   return c.json({ thread_id, result });
// });

// app.post('/is-user-thread', async c => {
//   const body = await c.req.json();
//   const user_id = body.user_id;
//   console.log({ user_id });
//   const user = await getUser(user_id);

//   return user && user[0].ai_thread_id
//     ? c.json({ thread: true })
//     : c.json({ thread: false });
// });

// export const isUserThread = async (req: Request, res: Response) => {
//   const { user_id } = req.body;
//   const user = await User!.findOne({ where: { user_id: user_id } });

//   user && user.thread_id
//     ? res.send({ thread: true })
//     : res.send({ thread: false });
// };

export default app;
