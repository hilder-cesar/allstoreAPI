const { verify } = require('jsonwebtoken');

module.exports = {
    checkToken: (req, res, next) => {
        let token = req.get("authorization");
        if(token){
            token = token.replace(/bearer ?/ig, '');
            verify(token, process.env.TOKEN_KEY, (err, decoded) => {
                if(err){
                    res.status(400).json({
                        sucess: "Erro",
                        message: "Invalid Token"
                    })
                }else{
                    next();
                }
            })
        }else{
            res.json({
                sucess: "Erro",
                message: "Acesso não permitido!"
            })
        }
    }
}