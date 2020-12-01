const express = require('express');
const mongoose = require('mongoose');
const rotas = require('./rotas/routes');
const multer = require('multer')
const path = require('path');
const app = express();
mongoose.connect('mongodb+srv://Azazel-RooT_Jesus:~_XSS-Belphegor.SQLinjection@cluster0.h3aq2.mongodb.net/Miguelitto?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/files',express.static((path.resolve(__dirname, "..", "tmp","uploads"))))
app.use(rotas);

app.listen(3333);