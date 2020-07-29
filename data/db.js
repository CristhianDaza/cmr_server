import mongoose from 'mongoose';
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/clientes', {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

// Schema clientes
const clientesSchema = new mongoose.Schema({
  nombre: String,
  apellido: String,
  email: String,
  tipo: String,
  pedidos: Array,
  telefono: Number
});

const Clientes = mongoose.model('clientes', clientesSchema);

export { Clientes };