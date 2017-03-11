'use strict';


module.exports = (router, controller) => {

    router.route('/usuario/:usuario?')
        .post(controller.crear)
        .get(controller.leer)
        .put(controller.actualizar)
        .delete(controller.eliminar);

    return router;
};
