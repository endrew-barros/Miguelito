const Produto = require('../models/Produto');
module.exports = {
    async store(req, res) {
        const { produto,quantidade,valor, tipo } = req.body;
        var armazem = await Produto.findOne({ produto });
        if (!armazem) {
            const produtoCreate = await Produto.create({ produto, quantidade, valor, tipo});
            return res.json(produtoCreate)
        }
        return res.json(armazem);

    }, 
    async delete(req, res){
        const { id_produto } = req.query;
        console.log({id_produto})
            const remove = await Produto.deleteOne({ id_produto });
            return res.json(remove);
    }, 
    async index(req, res){
        const { tipo } = req.query;
        const dados = await Produto.find({tipo});
        return res.json({ dados });
    }, 
    async update(req, res){
        return res.json({msg:"update"});
    },
}