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
        /**
         * const results = await Comanda.find(
            {}, 
            ['_id', 'mesa', 'pedidos'], 
            function(err, someValue){
               
          } )    
          //vou percorrer cada pedido      
        let barzito =  await Promise.all(
            results.map(async p => {
                // pra cada pedido p
                // vou buscar a mesa e a lista de produtos da comanda
                const {mesa, pedidos} = p;
                //começar a processar a descrição dos produtos
                const descPedidos = await Promise.all(
                    pedidos.map(async e => {
                        // pra cada elemento contido na lista de produtos da comanda
                        // buscar pelo id, e retornar o nome do produto e o tipo
                        const {produto,tipo} = await Produto.findById(e);
                        // retornar produto e tipo
                            return {produto,tipo}
                    }

                    )
                )
                // retornar objeto com mesa e array de pedidos
                return {mesa, descPedidos};
            })


        )  
         */
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