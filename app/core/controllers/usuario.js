'use strict';


const [
    crypto,
    modelo,
    auth
] = attract('core/library/crypto', 'core/models', 'core/library/auth');
const m = modelo.schemas;

module.exports = {

    crear: (req, res, next) => {

        const bytes = crypto.bytes(128);
        const entropia = crypto.hmac(bytes);
        const contrasenaPrevia = req.body.contrasena;

        req.body.contrasena = crypto.hmac(entropia + req.body.contrasena);
        req.body.meta = {
            entropia: entropia
        };

        m.usuario.create(req.body)
            .then(usuario => {
                usuario.contrasena = contrasenaPrevia;
                return auth.login(usuario);
            })
            .then(sesion => res.send(sesion))
            .catch(error => next(error));
    },

    leer: (req, res, next) => {

        m.usuario.findOne({ _id: req.params.usuario })
            .select('-meta -contrasena')
            .lean()
            .exec()
            .then(usuario => {
                if (!usuario) {
                    return next({ status: 404 });
                }

                res.send(usuario);
            })
            .catch(error => next(error));
    },

    actualizar: (req, res) => {

    },

    eliminar: (req, res) => {

    }
};
