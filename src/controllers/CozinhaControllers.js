const Comanda = require('../models/Comanda');


module.exports = {
    async index(req, res){
        var dados = await Comanda.find().select('mesa cliente pedidos_cozinha')
        return res.json(dados);  
    }
}