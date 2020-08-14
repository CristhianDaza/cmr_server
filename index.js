import express from 'express';
//graphql 
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './data/schema';
import { resolvers } from './data/resolvers';

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config({path: 'variables.env'});

const port = process.env.PORT || 4000

const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  cors: {
    credentials: true,
    origin: (origin, callback) => {
        const whitelist = [
            "http://tender-borg-b0f490.netlify.app/",
            "https://tender-borg-b0f490.netlify.app/"
        ];

        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error("Not allowed by CORS"))
        }
    }
  },
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

app.listen({ port }, () => console.log(`Servidor Corriento ${server.graphqlPath}`))