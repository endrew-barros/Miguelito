const Estoque = require('../models/Estoque')
module.exports = {
    async store(req, res) {
        const { produto } = req.body;
        console.log({produto})
        var armazem = await Estoque.findOne({ produto });
        if (!armazem) {
            const produtoCreate = await Estoque.create({ produto });
            return res.json({msg : "Produto Criado"}, produtoCreate)
        }
        return res.json(armazem);

    },
}