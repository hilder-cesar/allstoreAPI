const { create, getMasterById, getMasters, updateMaster, deleteMaster, getMasterToken, inserToken, getInfo, loadData } = require('./master.service');
const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const { sign } = require('jsonwebtoken');

module.exports = {
    saveMaster: (req, res) => {
        const body = req.body;

        if(body.password){
            const salt = genSaltSync(10);
            body.password = hashSync(body.password, salt);
        }
        
        if(body.id){
            updateMaster(body, (err, results) => {
                if (err){ 
                    console.log(err); 
                    return res.status(400).json({
                        message: 'Erro'
                    }); 
                }
                return res.status(200).json({
                    message: "Sucesso",
                    data: 'Atualizado com sucesso'
                })
            })
        }else{
            create(body, (err, results) => {
                if (err){ 
                    console.log(err); 
                    return res.status(400).json({
                        message: 'Erro'
                    }); 
                }
                return res.status(200).json({
                    message: "Sucesso!",
                    data: { id: results.insertId }    
                })
            });
        }    
    },
    getMasterById: (req, res) => {
        const id = req.params.id;
        getMasterById(id, (err, results) => {
            if (err){ 
                console.log(err); 
                return res.status(500).json({
                    message: 'Database connection error'
                }); 
            }
            if(!results){
                return res.status(204).json({
                    message: "Nenhum usuário encontrado"
                })
            }
            return res.status(200).json({
                data: results[0]
            })
        })
    },
    getMasters: (req, res) => {
        getMasters((err, results) => {
            if(err){
                return res.status(400).json({
                    message: 'Erro'
                })
            }
            return res.json({
                sucess: 'Sucesso',
                data: results
            })
        })
    },
    deleteMaster: (req, res) => {
       const data = req.body;
       deleteMaster(data, (err, results) => {
           if(err) {
               console.log(err);
               return;
           }
           if(!results){
               return res.status(204).json({
                   message: "Nenhum registro encontrado"
               })
           }
           return res.status(200).json({
               message: "Usuário excluído"
           })
       }) 
    },
    login: (req, res) => {
        const body = req.body;
        getMasterToken(body, (err, results) => {
            if(err){
                return;
            }
            if(!results){
                return res.status(400).json({
                    errorMessage: 'Usuário não encontrado!',
                    data: []
                })
            }
            const result = compareSync(body.password, results.password);
            if(result){
                results.password = undefined;
                const jsontoken = sign({id: results.id, password: results.password}, process.env.TOKEN_KEY, {
                    expiresIn: "1h"
                });
                inserToken({id: results.id, access_token: jsontoken}, () => {});
                return res.status(200).json({
                    message: "Sucesso!",
                    access_token: jsontoken
                })
            }else{
                return res.status(400).json({
                    errorMessage: "Senha incorreta",
                    data: []
                })
            }
        })
    },
    getInfo: (req, res) => {
        let token = req.get("authorization");
        token = token.slice(7)
        getInfo(token, (err, results) => {
            if(err){ 
                return res.status(400).json({
                    data: err
                })
            }
            return res.status(200).json({
                data: { 
                    id: results.id, 
                    name: results.name, 
                    email: results.email, 
                    login: results.login
                }
            });
        })
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
            });
        });
    }
}