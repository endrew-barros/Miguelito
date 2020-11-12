const mongoose = require('mongoose');
const CardapioSchema = new mongoose.Schema({
    id    : String,
    nome  : String,
    preco : String,
});
module.exports = mongoose.model('Cardapio', CardapioSchema);