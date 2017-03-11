'use strict';

const [
    crypto,
    modelo,
    util
] = attract('core/library/crypto', 'core/models', 'util');
const m = modelo.schemas;
const firma = (req, sesion) => {

    const cabecera = req.get('x-auth');
    const horaCliente = cabecera.slice(64, 74);
    const firmaCliente = cabecera.slice(74, 138);

    const hash = (Object.keys(req.body).length) ? req.rawBody : req.originalUrl;
    const md5Checksum = crypto.hash(hash, 'md5');
    const textoPorFirmar = util.format('%s\n%s\n%s\n%s', req.method, req.originalUrl, md5Checksum, horaCliente);
    const firma = crypto.hmac(textoPorFirmar, 'sha256', 'hex', sesion.llavePrivada);

    return new Promise((si, no) => {
        if (firma === firmaCliente) {
            return si({
                usuario: sesion.usuario._id,
                llavePublica: sesion.llavePublica
            });
        }

        no({ status: 403 });
    });
};

module.exports = (req, res, next) => {

    let llavePublica = null;
    try {
        llavePublica = req.get('x-auth').slice(0, 64);
        if (!llavePublica) {
            throw new Error({ status: 403 });
        }
    } catch (error) {
        return next(error);
    }

    m.sesion
        .findOne({ llavePublica: llavePublica })
        .lean()
        .exec()
        .then(sesion => {
            if (!sesion) {
                return next({ status: 403 });
            }

            return firma(req, sesion);
        })
        .then(sesion => {
            req.sesion = sesion;
            next();
        })
        .catch(error => next(error));
};
