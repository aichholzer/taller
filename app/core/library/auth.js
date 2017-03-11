'use strict';


const [
    crypto,
    modelo
] = attract('core/library/crypto', 'core/models');
const m = modelo.schemas;

module.exports = {

    login: usuario => {

        /**
         * Buscamos al usuario que se conecta
         */
        return new Promise((si, no) => {

            m.usuario.login(usuario.usuario || null)
                .then(documento => {
                    if (!documento) {
                        return no({ status: 401 });
                    }

                    if (crypto.hmac(documento.meta.entropia + usuario.contrasena) !== documento.contrasena) {
                        return no({ status: 401 });
                    }

                    const bytes = crypto.bytes(256) + documento.contrasena;
                    return m.sesion.create({
                        usuario: documento._id,
                        llavePublica: crypto.hmac(bytes, 'sha256'),
                        llavePrivada: crypto.hmac(bytes)
                    });
                })
                .then(sesion => si({
                    usuario: sesion.usuario,
                    llavePublica: sesion.llavePublica,
                    llavePrivada: sesion.llavePrivada
                }))
                .catch(error => no(error));
        });
    },

    logout: sesion => m.sesion.remove({ llavePublica: sesion.llavePublica }).exec()
};
