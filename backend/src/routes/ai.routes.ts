import { Hono } from 'hono';
import { thread } from '../openai/init';
import { updateUserWithThreadAndAssistantId } from '../sql/openai.routes';

const app = new Hono();

// export const oai = async (req: Request, res: Response) => {
//   const { user_id, chatMsg } = req.body;
//   const user = await User!.findOne({ where: { user_id: user_id } });
//   const thread_id = user!.thread_id;
//   const assistant_id = user!.assistant_id;
//   const messages = await main(thread_id, assistant_id, chatMsg);
//   res.send(messages);
// };

app.post('/create-thread/:userid', async c => {
  const body = c.req.param();
  const user_id = body.userid;
  const threadData = await thread();
  const thread_id = threadData.thread.id;
  const assistant_id = threadData.assistant.id;

  const result = updateUserWithThreadAndAssistantId(
    thread_id,
    assistant_id,
    user_id
  );
  console.log({ thread_id, assistant_id, user_id });
  return c.json({ thread_id, result });
});

// export const createThread = async (req: Request, res: Response) => {
//   const { user_id } = req.body;
//   const threadData = await thread();
//   const thread_id = threadData.thread.id;
//   const assistant_id = threadData.assistant.id;
//   await User.update({ thread_id, assistant_id }, { where: { user_id } });
//   res.send(thread_id);
// };

// export const isUserThread = async (req: Request, res: Response) => {
//   const { user_id } = req.body;
//   const user = await User!.findOne({ where: { user_id: user_id } });

//   user && user.thread_id
//     ? res.send({ thread: true })
//     : res.send({ thread: false });
// };

export default app;
