const { create, getMasterById, getMasters, updateMaster, deleteMaster, getMasterToken, inserToken, getInfo } = require('./master.service');
const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const { sign } = require('jsonwebtoken');

module.exports = {
    createMaster: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        create(body, (err, results) => {
            if (err){ 
                console.log(err); 
                return res.status(500).json({
                    sucess: "Erro",
                    message: 'Database connection error'
                }); 
            }
            return res.status(200).json({
                sucess: "Sucesso",
                data: {
                    id: results.insertId
                }    
            })
        });
    },
    getMasterById: (req, res) => {
        const id = req.params.id;
        getMasterById(id, (err, results) => {
            if (err){ 
                console.log(err); 
                return res.status(500).json({
                    sucess: "Erro",
                    message: 'Database connection error'
                }); 
            }
            if(!results){
                return res.json({
                    sucess: "Sucesso",
                    message: "Nenhum usuário encontrado"
                })
            }
            return res.status(200).json({
                sucess: "Sucesso",
                data: results  
            })
        })
    },
    getMasters: (req, res) => {
        getMasters((err, results) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    sucess: 'Erro',
                    message: 'Erro'
                })
            }
            return res.json({
                sucess: 'Sucesso',
                data: results
            })
        })
    },
    updateMaster: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        updateMaster(body, (err, results) => {
            if (err){ 
                console.log(err); 
                return res.status(500).json({
                    sucess: "Erro",
                    message: 'Database connection error'
                }); 
            }
            return res.status(200).json({
                sucess: "Sucesso",
                data: 'Atualizado com sucesso'
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
               return res.json({
                   sucess: "Atenção",
                   message: "Nenhum registro encontrado"
               })
           }
           return res.status(200).json({
               sucess: "Sucesso",
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
                    error: 'Erro',
                    errorMessage: 'Usuário não encontrado!',
                    data: []
                })
            }
            const result = compareSync(body.password, results.password);
            if(result){
                results.password = undefined;
                const jsontoken = sign({result: results}, process.env.TOKEN_KEY, {
                    expiresIn: "1h"
                });
                inserToken({id: results.id, access_token: jsontoken}, () => {});
                return res.status(200).json({
                    sucess: 'Sucesso!',
                    message: "Sucesso!",
                    access_token: jsontoken
                })
            }else{
                return res.status(400).json({
                    error: 'Erro',
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
                    sucess: "Erro",
                    message: "Usuário não encontrado",
                    data: err
                })
            }
            return res.status(200).json({
                sucess: "Sucesso",
                message: "Usuário encontrado!",
                data: results
            });
        })
    }
}