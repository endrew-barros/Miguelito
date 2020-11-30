const Produto = require('../models/Produto');
const Comanda = require('../models/Comanda');


module.exports = {
    async index(req, res) {
        //Buscando todos pedidos
        const results = await Comanda.find(
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
                        const {produto,tipo} = await Produto.findById(e.item);
                        // retornar produto e tipo
                            return {produto,tipo}
                    }

                    )
                )
                // aqui eu vou filtrar o array de produtos detalhados e obter apenas os drinks
                const ped = descPedidos.filter(pe => {return pe.tipo==="drinks"})
                // retornar objeto com mesa e array de pedids do tipo drinks
                return {mesa, pedidos:ped};
            })


        )  
        //concluir enviando de volta todos os pedidos do bar    
        return res.json(barzito)
    }
}