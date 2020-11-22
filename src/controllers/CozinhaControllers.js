const Comanda = require('../models/Comanda');


module.exports = {
    async index(req, res){
        var dados = await Comanda.findAll({where: {tipo: "petisco"}})
        return res.json(dados);  
    }
}