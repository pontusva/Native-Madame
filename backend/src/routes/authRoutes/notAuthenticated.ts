import { Hono } from 'hono';
import { insertUser } from '../../postgresjs/auth';
const app = new Hono();

interface RegisterBody {
  username: string;
  email: string;
  name: string;
  uid: string;
}

app.post('/register', async c => {
  const body: RegisterBody = await c.req.json();

  const { name, username, email, uid } = body;
  insertUser({ name, username, email, uid });

  return c.json({
    insertUser,
  });
});

export default app;
