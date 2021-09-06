const { create, updateEstablishment, getById, loadData, blockUnblock, addUser, updateUser, getUserToken, inserToken } = require('./establishment.service');
const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const { sign } = require('jsonwebtoken');

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
            });
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
    },
    blockUnblock: (req, res) =>{
        const body = req.body;
        blockUnblock(body, (err, results) => {
            if(err){
                return res.status(400).json({
                    message:err
                });
            }
            if(body.block){
                return res.status(200).json({
                    message: 'Estabelecimento bloqueado com sucesso'
                })
            }else{
                return res.status(200).json({
                    message: 'Estabelecimento desbloqueado com sucesso'
                })
            }
        })
    },
    saveEstablishmentUser: (req, res) => {
        const body = req.body;

        if(body.password){
            const salt = genSaltSync(10);
            body.password = hashSync(body.password, salt);
        }
        
        if(body.id){
            updateUser(body, (err, results) => {
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
            addUser(body, (err, results) => {
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
    login: (req, res) => {
        const body = req.body;
        getUserToken(body, (err, results) => {
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
                    expiresIn: "4h"
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
}