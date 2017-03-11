'use strict';


const errors = require('./errores.json');

module.exports = (error, req, res, next) => {

    const status = error.status || 404;
    const code = error.code || 10;

    res.status(status).send({
        status: status,
        mensaje: errors[status][code] || error.message
    });

    next = null;
};
