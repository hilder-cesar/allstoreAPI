const buscaCep = require('busca-cep');

module.exports = {
    getCep: (req, res) => {
        const cep = req.params.cep;
        buscaCep(cep, {sync: false, timeout: 1000})
        .then(endereco => {
            return res.status(200).json({
                data: {
                    streetAddress: endereco.logradouro,
                    state: endereco.uf,
                    city: endereco.localidade,
                    neighborhood: endereco.bairro
                }
            });
        })
        .catch(err => {  
            console.log(err); 
            return res.status(400).json({
                erro: true,
                error: err
            });
        });
    }
}