'use strict';


const firma = attract('core/library/firma');

module.exports = (router, controller) => {

    router.route('/usuarios/:usuario?')
        .post(controller.crear)
        .get(firma, controller.leer)
        .put(firma, controller.actualizar)
        .delete(firma, controller.eliminar);

    return router;
};
