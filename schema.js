import { buildSchema } from 'graphql';
const schema = buildSchema(`
  type Cliente {
    id: ID
    nombre: String
    apellido: String
    telefono: Int
    tipo: TipoCliente
    pedidos: [Pedido]
    emails: [Email]
  }

  type Pedido {
    producto: String
    precio: Int
  }

  type Email {
    email: String
  }

  enum TipoCliente {
    BASICO
    PREMIUM
  }
  
  type Query {
    getCliente(id: ID): Cliente
  }

  input PedidoInput {
    producto: String
    precio: Int
  }

  input EmailInput {
    email: String
  }

  input ClienteInput {
    id: ID
    nombre: String!
    apellido: String!
    telefono: Int!
    tipo: TipoCliente!
    pedidos: [PedidoInput]!
    emails: [EmailInput]!
  }
  """ Mutations para crear nuevos Clientes """
  type Mutation {
    #Nombre del Resolver, Input cont ados y valor que retorna
    """ Te permite crear nuevos clientes """
    crearCliente(input: ClienteInput): Cliente
  }
`);

export default schema;