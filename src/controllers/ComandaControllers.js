const Comanda = require('../models/Comanda');
module.exports = {

    async index(req, res) {
        const dados = await Comanda.find();
        return res.json(dados);
    },
    async store(req, res) {
        const { mesa, cliente, pedidos, valorTotal } = req.body;
        var comanda = await Comanda.create({ mesa, cliente, pedidos, valorTotal });
        return res.json({ comanda });
    },
    async delete(req, res) {
        const { id_comanda } = req.params;
        var retorno = await Comanda.findOneAndDelete({ _id: id_comanda }, (err) => {
            if (err) {
                return res.status(400).json({ error: true, msg: "Ops ! Algo deu errado." })
            }
            return res.status(200).json({ error: false, msg: "Removido com Sucesso !!!" })
        });
    },
    async update(req, res) {
        const { id_comanda } = req.params;
        const { mesa, cliente, pedidos, valorTotal } = req.body;
        await Comanda.findByIdAndUpdate({ _id: id_comanda }, {
            $set: { mesa, cliente, pedidos, valorTotal }
        }, { upsert: true }, (err) => {
            if (err) {
                return res.status(400).json({ error: true, msg: "Ops ! Algo deu errado." })
            }
            return res.status(200).json({ error: false, msg: "Alterado com Sucesso." })
        });
    },
};