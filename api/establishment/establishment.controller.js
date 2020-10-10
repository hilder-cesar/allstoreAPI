const { create, updateEstablishment, getById, loadData } = require('./establishment.service');

module.exports = {
    saveEstablishment: (req, res) => {
        const body = req.body;

        if(body.id){
            updateEstablishment(body, (err, results) => {
                if (err){
                    return res.status(400).json({
                        message: err
                    }); 
                }
                return res.status(200).json({
                    message: "Atualizado com sucesso"
                })
            })
        }else{
            create(body, (err, results) => {
                if (err){ 
                    return res.status(400).json({
                        message: err
                    }); 
                }
                return res.status(200).json({
                    message: 'Sucesso',
                    data: { id: results.insertId }
                })
            })
        }
    },
    getById: (req, res) => {
        const id = req.params.id;
        getById(id, (err, results) => {
            if (err){
                return res.status(400).json({
                    message: err
                }); 
            }
            if(!results){
                return res.status(204).json({
                    message: "Nenhum usuário encontrado"
                })
            }
            return res.status(200).json({
                data: results
            })
        });
    },
    loadData: (req, res) => {
        loadData((err, results) => {
            if(err){
                return res.status(400).json({
                    message: err
                })
            }
            if(!results){
                return res.status(204).json({
                    message: "Nenhum usuário encontrado"
                })
            }
            return res.status(200).json({
                data: results
            })
        })
    }
}