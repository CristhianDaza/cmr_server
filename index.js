import express from 'express';
//graphql 
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './data/schema';
import { resolvers } from './data/resolvers';

const app = express();
const server = new ApolloServer({typeDefs, resolvers});

server.applyMiddleware({ app });

app.listen({ port: 4000 }, () => console.log(`Servidor Corriento ${server.graphqlPath}`))