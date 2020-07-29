import mongoose from 'mongoose';
import { Clientes } from './db';

export const resolvers = {
  Query: {
    getCliente: ({ id }) => {
      return new Cliente(id, clientesDB[id]);
    }
  },
  Mutation: {
    crearCliente: (root, { input }) => {
      const nuevoCliente = new Clientes({
        nombre: input.nombre,
        apellido: input.apellido,
        emails: input.emails,
        tipo: input.tipo,
        pedidos: input.pedidos,
        telefono: input.telefono
      });
      nuevoCliente.id = nuevoCliente._id;
      return new Promise((resolve, object) => {
        nuevoCliente.save((error) => {
          if(error) rejects(error)
          else resolve(nuevoCliente)
        })
      });
    },
    actualizarCliente: (root, { input }) => {
      return new Promise((resolve, object) => {
        Clientes.findOneAndUpdate({ _id: input.id }, input, { new: true }, (error, cliente) => {
          if (error) rejects(error)
          else resolve(cliente)
        });
      });
    }
  }
}
