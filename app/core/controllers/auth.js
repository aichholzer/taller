'use strict';


const auth = attract('core/library/auth');

module.exports = {

    login: (req, res, next) => {

        auth.login(req.body)
            .then(sesion => res.send(sesion))
            .catch(error => next(error));
    },

    logout: (req, res, next) => {

        if (!req.sesion) {
            return next({ status: 401 });
        }

        auth.logout(req.sesion)
            .then(() => res.status(200).end());
    }
};
