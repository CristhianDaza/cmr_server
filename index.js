import express from 'express';
//graphql 
import { graphqlHTTP } from 'express-graphql';
import { schema } from './data/schema';

const app = express();

app.get('/', (req, res) => {
  res.send('Todo Listo');
});

app.use('/graphql', graphqlHTTP({
  // Schema a usar
  schema,
  // utilizar graphiql
  graphiql: true
}));

app.listen(8000, () => console.log('Funcionando'));