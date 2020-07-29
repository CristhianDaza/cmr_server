import mongoose from 'mongoose';
import { Clientes } from './db';

export const resolvers = {
  Query: {
    getClientes: (root, { limite }) => {
      return Clientes.find({}).limit(limite)
    },
    getCliente:(root, { id }) => {
      return new Promise((resolve, object) => {
        Clientes.findById(id, (error, cliente) => {
          if(error) rejects(error)
          else resolve(cliente)
        })
      });
    }
  },
  Mutation: {
    crearCliente: (root, { input }) => {
      const nuevoCliente = new Clientes({
        nombre: input.nombre,
        apellido: input.apellido,
        cedula: input.cedula,
        ciudad: input.ciudad,
        direccion: input.direccion,
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
    },
    eliminarCliente: (root, { id }) => {
      return new Promise((resolve, object) => {
        Clientes.findOneAndDelete({ _id: id }, (error) => {
          if (error) rejects(error)
          else resolve('Se elimino correctamente')
        })
      });
    }
  }
}
