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
        let barzito =  await Promise.all(
            results.map(async p => {
                const {mesa, pedidos} = p;
                const descPedidos = await Promise.all(
                    pedidos.map(async e => {
                        const {produto,tipo} = await Produto.findById(e.item);
                            return {produto,tipo}
                    })
                )
                const ped = descPedidos.filter(pe => {return pe.tipo!=="drinks"})
                return {mesa, pedidos:ped};
            })
        )  
        return res.json(barzito)
    }
}