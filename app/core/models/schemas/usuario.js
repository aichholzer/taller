'use strict';


module.exports = mongoose => {

    const Schema = mongoose.Schema;
    const schema = new Schema(
        {
            usuario: {
                type: String,
                trim: true,
                required: true,
                unique: true
            },
            contrasena: {
                type: String,
                trim: false,
                required: true
            },
            nombre: {
                nombre: {
                    type: String,
                    trim: true,
                    default: null
                },
                apellido: {
                    type: String,
                    trim: true,
                    default: null
                }
            },
            meta: {
                entropia: {
                    type: String,
                    default: null
                },
                fechaDeCreacion: {
                    type: Date,
                    default: Date.now
                },
                ultimaSesion: {
                    type: Date,
                    default: null
                }
            }
        },
        {
            strict: true,
            versionKey: false
        }
    );

    schema.statics = {

        login: function (usuario) {
            const query = { usuario: usuario };
            const update = { 'meta.ultimaSesion': new Date() };

            return this.findOneAndUpdate(query, update)
                .lean()
                .exec();
        }
    };

    return mongoose.model('Usuario', schema, 'usuarios');
};
