import mongoose from 'mongoose';
import { Clientes, Productos } from './db';

export const resolvers = {
  Query: {
    getClientes: (root, { limite, offset }) => {
      return Clientes.find({}).limit(limite).skip(offset)
    },
    getCliente:(root, { id }) => {
      return new Promise((resolve, object) => {
        Clientes.findById(id, (error, cliente) => {
          if(error) rejects(error)
          else resolve(cliente)
        })
      });
    },
    totalClientes: (root) => {
      return new Promise((resolve, object) => {
        Clientes.countDocuments({}, (error, count) => {
          if(error) rejects(error)
          else resolve(count)
        })
      })
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
    },
    nuevoProducto: (root, { input }) => {
      const nuevoProducto = new Productos({
        referencia: input.referencia,
        descripcion: input.descripcion,
        stock: input.stock,
        precio: input.precio
      });
      nuevoProducto.id = nuevoProducto._id;
      return new Promise((resolve, object) => {
        nuevoProducto.save((error) => {
          if(error) rejects(error)
          else resolve(nuevoProducto)
        })
      })
    }
  }
}
