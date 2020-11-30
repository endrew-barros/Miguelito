const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ComandaSchema = new mongoose.Schema({
    mesa: Number,
    cliente: String,
    pedidos: Array,
    valorTotal: Number
});
module.exports = mongoose.model('Comanda', ComandaSchema);