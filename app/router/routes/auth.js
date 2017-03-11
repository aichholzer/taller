'use strict';


module.exports = (router, controller) => {

    router.route('/auth/:usuario?')
        .post(controller.login)
        .delete(controller.logout);

    return router;
};
