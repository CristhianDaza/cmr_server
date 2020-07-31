import mongoose, { Mongoose } from 'mongoose';
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/clientes', {
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

export { Clientes, Productos };