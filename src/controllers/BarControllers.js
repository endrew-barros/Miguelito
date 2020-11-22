const Produto = require('../models/Produto')
const Comanda = require('../models/Comanda');


module.exports = {
    async index(req, res) {
        const results = await Comanda.find(
            {'_id': pedidos._id, $in:{'pedidos': pedidos}, (res, pedidos) => {
                return res.json(pedidos)
        }})
    }
}