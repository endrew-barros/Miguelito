const mongoose = require('mongoose');
const EstoqueSchema = new mongoose.Schema({
    produto  : String,
    quantidade : Number,
    valor : Number

});
module.exports = mongoose.model('Estoque', EstoqueSchema);