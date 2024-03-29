const pool = require('../../config/database');

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `insert into master(name, email, login, password) values(?, ?, ?, ?)`,
            [ data.name, data.email, data.login, data.password ],
            (error, results, fields) => {
                if(error){ return callBack(error) }
                return callBack(null, results)
            }
        )
    },
    updateMaster: (data, callBack) => {
        pool.query(
            `update master set name=?, email=?, login=?, password=? where id=?`,
            [ data.name, data.email, data.login, data.password, data.id ],
            (error, results, fields) => {
                if(error){ callBack(error); }
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
            `SELECT * FROM master WHERE id=?`,
            [ id ],
            (error, results, fields) => {
                if(error){ return callBack(error) }
                return callBack(null, results);
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
    getInfo: (data, callBack) => {
        pool.query(
            `SELECT * FROM master WHERE access_token=?`,
            [ data ],
            (error, results, fields) => {
                if(error){ callBack(error); }
                return callBack(null, results[0])
            }
        )
    },
    loadData: (callBack) => {
        pool.query(
            `SELECT * FROM master`,
            (err, results) => {
                if(err){ callBack(err); }
                return callBack(null, results)
            }
        )
    }
};