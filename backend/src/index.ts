import { Hono } from 'hono';
import register from './routes/authRoutes/notAuthenticated';
import pet from './routes/fileUpload/imageUpload';

const app = new Hono();

app.get('/hello', c => {
  return c.json({
    message: `Hello!`,
  });
});

app.route('/auth', register);
app.route('/upload/pet', pet);

// app.post('/pet', async c => {
//   const body = await c.req.formData();
//   const file = body.get('photo'); // File | string
//   console.log({ file: file });
//   return c.json({
//     test: 'test',
//     file,
//     body,
//   });
//   // Now you can handle the uploaded file
//   // For example, you can save it to disk, store it in a database, etc.
// });

export default {
  port: 8080,
  fetch: app.fetch,
};
