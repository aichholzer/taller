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

    return mongoose.model('Usuario', schema, 'usuarios');
};
