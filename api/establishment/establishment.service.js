const pool = require('../../config/database');

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `INSERT INTO establishments(socialName, fantasyName, cnpj, email, zipCode, streetAddress, number, state, city, neighborhood, complement, photo, description, responsableName, responsableCpf, responsablePhone)
            values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [ 
                data.socialName, 
                data.fantasyName, 
                data.cnpj, 
                data.email,
                data.zipCode, 
                data.streetAddress, 
                data.number, 
                data.state, 
                data.city, 
                data.neighborhood, 
                data.complement, 
                data.photo, 
                data.description, 
                data.responsableName, 
                data.responsableCpf, 
                data.responsablePhone
            ],
            (error, results, fields) => {
                if(error){ return callBack(error) }
                return callBack(null, results)
            }
        )
    },
    updateEstablishment: (data, callBack) => {
        pool.query(
            `UPDATE establishments set socialName=?, fantasyName=?, cnpj=?, email=?, zipCode=?, streetAddress=?, number=?, state=?, city=?, neighborhood=?, complement=?, photo=?, description=?, responsableName=?, responsableCpf=?, responsablePhone=? where id=?`,
            [ 
                data.socialName, 
                data.fantasyName, 
                data.cnpj, 
                data.email,
                data.zipCode, 
                data.streetAddress, 
                data.number, 
                data.state, 
                data.city, 
                data.neighborhood, 
                data.complement, 
                data.photo, 
                data.description, 
                data.responsableName, 
                data.responsableCpf, 
                data.responsablePhone,
                data.id
            ],
            (error, results, fields) => {
                if(error){ return callBack(error) }
                return callBack(null, results)
            }
        )
    },
    getById: (id, callBack) => {
        pool.query(
            `SELECT * FROM establishments where id=?`,
            [ id ],
            (err, results, fields) => {
                if(err){ callBack(err); }
                return callBack(null, results[0])
            }
        )
    },
    loadData: (callBack) => {
        pool.query(
            `SELECT * FROM establishments`,
            (err, results) => {
                if(err){ callBack(err); }
                return callBack(null, results)
            }
        )
    }
}