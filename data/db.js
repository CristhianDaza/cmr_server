import mongoose, { Mongoose } from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config({path: 'variables.env'});
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB , {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

// Schema clientes
const clientesSchema = new mongoose.Schema({
  nombre: String,
  apellido: String,
  cedula: String,
  ciudad: String,
  direccion: String,
  emails: Array,
  tipo: String,
  pedidos: Array,
  telefono: String
});

const Clientes = mongoose.model('clientes', clientesSchema);

// Schema productos
const productosSchema = new mongoose.Schema({
  referencia: String,
  descripcion: String,
  stock: Number,
  precio: Number
});

const Productos = mongoose.model('productos', productosSchema);

// Schema pedidos
const pedidosSchema = new mongoose.Schema({
  pedido: Array,
  total: Number,
  fecha: Date,
  cliente: mongoose.Types.ObjectId,
  estado: String
})

const Pedidos = mongoose.model('pedidos', pedidosSchema)

// Schema Usuarios
const usuariosSchema = new mongoose.Schema({
  usuario: String,
  password: String
});
// Hashear los pass antes de guardarlos
usuariosSchema.pre('save', function(next) {
  // si el password no esta modificado ejecutar
  if (!this.isModified('password')) {
    return next()
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err);
      this.password = hash;
      next()
    })
  })
})

const Usuarios = mongoose.model('usuarios', usuariosSchema);

export { Clientes, Productos, Pedidos, Usuarios };