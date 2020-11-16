const Bar = require('../models/Produto');
const Comanda = require('../models/Comanda');


module.exports = {
    async index(req, res){
        var dados = await Comanda.find().select('pedidos -_id')
        var produto = await Comanda.findById(dados[0])
        return res.json(produto);  
    }
}