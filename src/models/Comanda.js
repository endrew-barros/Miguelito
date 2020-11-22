const mongoose = require('mongoose');
const ComandaSchema = new mongoose.Schema({
    mesa: Number,
    cliente: String,
    pedidos: Array,
    valorTotal: Number
});
module.exports = mongoose.model('Comanda', ComandaSchema);