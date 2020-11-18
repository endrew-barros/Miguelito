const Comanda = require('../models/Comanda')


module.exports = {

    async index(req, res) {
        var { mesa } = req.query;
        if (!mesa) {
            const dados = await Comanda.find();
            return res.json(dados);
        }
        const dados = await Comanda.find({ mesa });
        if (dados == 0) {
            return res.json({ msg: "Mesa nao encontrada !!!" });
        }
        return res.json(dados);
    },

    async delete(req, res) {
        const { id_comanda } = req.params;
        var retorno = await Comanda.findOneAndDelete({ _id: id_comanda }, (err) => {
            if (err) {
                return res.status(400).json({ error: true, msg: "Ops ! Algo deu errado." })
            }
            return res.status(200).json({ error: false, msg: "Removido com Sucesso !!!" })
        });
    }
}