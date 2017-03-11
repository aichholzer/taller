'use strict';


const crypto = require('crypto');
const llave = '92f73d014a282ec8bc6a1997c48a8135b381dc7e6f070573af982ad3ca1ef6a8';

module.exports = {

    bytes: (length, encoding) => {

        encoding = encoding || 'hex';
        return crypto.randomBytes(length).toString(encoding);
    },

    hmac: (data, hash, encoding, key) => {

        hash = hash || 'RSA-SHA512';
        encoding = encoding || 'hex';
        key = key || llave;

        return crypto.createHmac(hash, key).update(data).digest(encoding);
    },

    hash: (data, hash, encoding) => {

        if (typeof data !== 'string') {
            data = JSON.stringify(data);
        }

        hash = hash || 'RSA-SHA512';
        encoding = encoding || 'hex';

        return crypto.createHash(hash).update(data, 'utf8').digest(encoding);
    }
};
