#!/usr/bin/env node
'use strict';


require('attract')({ basePath: __dirname + '/../app' });
const [
    crypto,
    util
] = attract('core/library/crypto', 'util');
const argv = require('yargs')
    .options({
        privada: { alias: 'pr', describe: 'Llave privada.', demand: true },
        publica: { alias: 'pu', describe: 'Llave publica.', demand: true },
        verbo: { alias: 'v', describe: 'Verbo HTTP', demand: true },
        uri: { alias: 'u', describe: 'Channel.', demand: true },
        cuerpo: { alias: 'c', describe: 'Cuerpo de la peticion.', default: null }
    })
    .usage('\nUso: firma.js -v [verbo]')
    .example('firma.js -l=74ynoiwei434n9384h39h -v=post -u=/usuarios/12345')
    .argv;

const hora = Math.round((new Date()).getTime() / 1000);
const cuerpo = argv.cuerpo ? JSON.stringify(argv.cuerpo) : argv.uri;
const md5Checksum = crypto.hash(cuerpo, 'md5');
const textoPorFirmar = util.format('%s\n%s\n%s\n%s', argv.verbo.toUpperCase(), argv.uri, md5Checksum, hora);
const firma = crypto.hmac(textoPorFirmar, 'sha256', 'hex', argv.pr);

console.log('\n' + argv.pu + hora + firma + '\n');
