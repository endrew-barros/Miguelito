const Produto = require('../models/Produto')
const Comanda = require('../models/Comanda');
module.exports = {

    async index(req, res) {
        const dados = await Comanda.find();
        if(dados == 0){
            return res.json({msg : "Nenhuma comanda a ser Listada"});
        }
            return res.json(dados);
    },
    async store(req, res) {
        const { mesa, cliente, pedidos } = req.body;
        const comanda_tmp = await Promise.all(
            pedidos.map(async p => {
            const {valor} = await Produto.findById(p);
            return {valor}
        }))
        const array_val = comanda_tmp.map(c => c.valor);
        const valorTotal = array_val.reduce((p, b) => p+b,0);
        const comanda = await Comanda.create({ mesa, cliente, pedidos, valorTotal});
        console.log(comanda_tmp)
        return res.json(comanda);
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
        const { mesa, cliente, pedidos} = req.body;
        await Comanda.findByIdAndUpdate({ _id: id_comanda }, {
            $set: { mesa, cliente, pedidos}
        }, { upsert: true }, (err) => {
            if (err) {
                return res.status(400).json({ error: true, msg: "Ops ! Algo deu errado." })
            }
            return res.status(200).json({ error: false, msg: "Alterado com Sucesso." })
        });
    },
};