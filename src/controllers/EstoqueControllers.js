const Estoque = require('../models/Estoque')
module.exports = {
    async store(req, res) {
        const { produto,quantidade,valor } = req.body;
        
        console.log({produto})
        var armazem = await Estoque.findOne({ produto });
        if (!armazem) {
            const produtoCreate = await Estoque.create({ produto,quantidade,valor });
            return res.json(produtoCreate)
        }
        return res.json(armazem);

    },
}