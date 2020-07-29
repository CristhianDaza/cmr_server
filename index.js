import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('Todo Listo');
});

app.listen(8000, () => console.log('Funcionando'));