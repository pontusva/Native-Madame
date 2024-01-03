import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  defaultHeaders: {
    'OpenAI-Beta': 'Assistants=v1',
  },
});

export const thread = async () => {
  const assistant = await openai.beta.assistants.create({
    name: 'Math Tutor',
    instructions:
      'You are a personal pet detective. Answer questions related to lost pets.',
    tools: [{ type: 'code_interpreter' }],
    model: 'gpt-3.5-turbo-1106',
  });
  const thread = await openai.beta.threads.create();
  return { assistant, thread };
};

export async function main(
  thread_id: string,
  assistant_id: string,
  chatMsg: string
) {
  const userAssistant = await openai.beta.assistants.retrieve(assistant_id);
  const message = await openai.beta.threads.messages.create(thread_id, {
    role: 'user',
    content: chatMsg,
  });

  const run = await openai.beta.threads.runs.create(thread_id, {
    assistant_id: userAssistant.id,
  });

  let runState;

  do {
    runState = await openai.beta.threads.runs.retrieve(thread_id, run.id);
  } while (runState.status !== 'completed');

  const messages = await openai.beta.threads.messages.list(thread_id);

  return messages;
}
