module.exports = {

    index (req, res){
        return res.json({msg:"Listou o Caixa"})
    }, 
    
    delete (req, res){
        return res.json({msg:"Deletou do Caixa"})
    }

}