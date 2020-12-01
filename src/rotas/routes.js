const express = require('express');
const mongoose = require('mongoose');

const multer = require('multer');
const multerConfig = require('../config/multer')
const Post = require('../models/Post')

const IndexControllers = require('../controllers/IndexControllers');
const BuscarProdutoControllers = require('../controllers/BuscarProdutoControllers');
const ComandaControllers = require('../controllers/ComandaControllers');
const AdminControllers = require('../controllers/AdminControllers');
const BarControllers = require('../controllers/BarControllers');
const CozinhaControllers = require('../controllers/CozinhaControllers');
const ProdutoControllers = require('../controllers/ProdutoControllers');
const CaixaControllers = require('../controllers/CaixaControllers');

const routes = express.Router();

//Cliente
routes.get('/index', IndexControllers.store);
routes.post('/comanda/adicionar', ComandaControllers.store);
routes.get('/produto/listar', ProdutoControllers.index);
routes.get('/produto/buscar/:prod_nome', BuscarProdutoControllers.index);

//Admin
routes.get('/admin', AdminControllers.store); //Login
routes.get('/admin/comanda/listar', ComandaControllers.index); //Comanda Listar
routes.post('/admin/comanda/alterar/:id_comanda', ComandaControllers.update); //Comanda Alterar
routes.delete('/admin/comanda/encerrar/:id_comanda', ComandaControllers.delete); //Comanda Excluir
routes.get('/admin/bar/listar', BarControllers.index); //Bar Listar
routes.get('/admin/cozinha/listar', CozinhaControllers.index); //Cozinha Listar
routes.post('/admin/produto/cadastrar', ProdutoControllers.store); //Produto Adicionar
//routes.get('/admin/produto/cadastrar', ProdutoControllers.store); //Produto Adicionar
routes.delete('/admin/produto/remover/:id_produto', ProdutoControllers.delete); //Produto Remover 
routes.post('/admin/produto/alterar/:id_produto', ProdutoControllers.update); //Produto Alterar 
routes.get('/admin/caixa/listar', CaixaControllers.index); //Caixa Listar
routes.delete('/admin/caixa/remover/:id_comanda', CaixaControllers.delete); //Caixa Deletar

routes.get('/post/listar', async(req,res)=>{
    const posts =await Post.find();
    return res.json(posts)
})
routes.post("/post", multer(multerConfig).single("file"), async(req,res)=>{
    const {originalname: name,size, key, location: url=""}= req.file;
    console.log(req.file);
    const post= await Post.create({
        name,
        size,
        key,
        url
    });
    return res.json(post);
});
routes.delete('/post/:id',async(req,res)=>{
    const post = await Post.findById(req.params.id);
    await post.remove();
    return res.json({msg: "imagem deletada"})
})
module.exports = routes;
// ----------------------------pronto----------------------