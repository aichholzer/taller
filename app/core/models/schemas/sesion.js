'use strict';


module.exports = mongoose => {

    const Schema = mongoose.Schema;
    const schema = new Schema(
        {
            usuario: {
                type: Schema.Types.ObjectId,
                ref: 'Usuario',
                required: true
            },
            llavePublica: {
                type: String,
                required: true
            },
            llavePrivada: {
                type: String,
                required: true
            },
            meta: {
                fechaDeCreacion: {
                    type: Date,
                    default: Date.now
                }
            }
        },
        {
            strict: true,
            versionKey: false
        }
    );

    return mongoose.model('Sesion', schema, 'sesiones');
};
