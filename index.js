import express from 'express';
//graphql 
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './data/schema';
import { resolvers } from './data/resolvers';

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config({path: 'variables.env'});

const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async({req}) => {
    // obtner token
    const token = req.headers['authorization']
    if(token !== 'null') {
      try {
        const usuarioActual = await jwt.verify(token, process.env.SECRETO)

        req.usuarioActual = usuarioActual

        return {
          usuarioActual
        }
      } catch (err) {
        console.log(err)
      }
    }
  }
});

server.applyMiddleware({ app });

app.listen({ port: 4000 }, () => console.log(`Servidor Corriento ${server.graphqlPath}`))