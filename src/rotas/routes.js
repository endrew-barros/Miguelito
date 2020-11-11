const express = require('express');

const IndexControllers = require('../controllers/IndexControllers');
const CardapioControllers = require('../controllers/CardapioControllers');
const PedidoControllers = require('../controllers/PedidoControllers');
const AdminControllers = require('../controllers/AdminControllers');
const DrinkControllers = require('../controllers/DrinkControllers');
const CozinhaControllers = require('../controllers/CozinhaControllers');

const routes = express.Router();

// const IndexControllers = (req,res)=>{
//   return res.json({msg:"Ola"});
// }

routes.get('/index', IndexControllers.store);
routes.get('/cardapio', CardapioControllers.store);
routes.get('/pedido', PedidoControllers.store);
routes.get('/admin', AdminControllers.store);
routes.get('/admin/drink', DrinkControllers.store);
routes.get('/admin/cozinha', CozinhaControllers.store);

module.exports = routes;