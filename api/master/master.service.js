const pool = require('../../config/database');

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `insert into master(login, password) values(?, ?)`,
            [ data.login, data.password ],
            (error, results, fields) => {
                if(error){ return callBack(error) }
                return callBack(null, results)
            }
        )
    },
    getMasters: callBack => {
        pool.query(
            `select id, login, password from master`,
            [],
            (error, results, fields) => {
                if(error){ return callBack(error) }
                return callBack(null, results)
            }
        )
    },
    getMasterById: (id, callBack) => {
        pool.query(
            `SELECT id, login, password FROM master WHERE id=?`,
            [id],
            (error, results, fields) => {
                if(error){ return callBack(error) }
                return callBack(null, results);
            }
        )
    },
    updateMaster: (data, callBack) => {
        pool.query(
            `update master set login=?, password=?, access_token=?, where id=?`,
            [ data.login, data.password, data.access_token, data.id ],
            (error, results, fields) => {
                if(error){ callBack(error); }
                return callBack(null, results)
            }
        )
    },
    deleteMaster: (data, callBack) => {
        pool.query(
            `delete from master where id = ?`,
            [data.id],
            (error, results, fields) => {
                if(error){ return callBack(error) }
                return callBack(null, results)
            }
        )
    },
    getMasterToken: (data, callBack) =>{
        const login = data.login;
        pool.query(
            `SELECT * FROM master WHERE login=?`,
            [login],
            (error, results, fields) => {
                if(error){
                    return callBack(error)
                }
                return callBack(null, results[0])
            }
        )
    },
    inserToken: (data, callBack) => {
        pool.query(
            `UPDATE master SET access_token=? WHERE id=?`,
            [ data.access_token, data.id ],
            (error, results, fields) => {
                if(error){ callBack(error); }
                return callBack(null, results)
            }
        )
    },
};