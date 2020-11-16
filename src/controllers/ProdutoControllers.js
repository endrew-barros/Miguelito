const Produto = require('../models/Produto');
module.exports = {
    async store(req, res) {
        const { produto, quantidade, valor, tipo } = req.body;
        var armazem = await Produto.findOne({ produto });
        if (!armazem) {
            const produtoCreate = await Produto.create({ produto, quantidade, valor, tipo });
            return res.json(produtoCreate)
        }
        return res.json(armazem);

    },
    async delete(req, res) {
        const { id_produto } = req.params;
        var retorno = await Produto.findOneAndDelete({ _id: id_produto }, (err) => {
            if (err) {
                return res.status(400).json({ error: true, msg: "Ops ! Algo deu errado." })
            }
            return res.status(200).json({ error: false, msg: "Removido com Sucesso !!!" })
        });
    },
    async index(req, res) {
        const { tipo } = req.query;
        const dados = await Produto.find({ tipo });
        return res.json({ dados });
    },
    async update(req, res) {
        const { id_produto } = req.params;
        const { produto, quantidade, valor, tipo } = req.body;
        await Produto.findByIdAndUpdate({ _id: id_produto }, {
            $set: { produto, quantidade, valor, tipo }
        }, { upsert: true }, (err) => {
            if (err) {
                return res.status(400).json({ error: true, msg: "Ops ! Algo deu errado." })
            }
            return res.status(200).json({ error: false, msg: "Alterado com Sucesso" })
        });
    },
}