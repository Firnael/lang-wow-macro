const { WowMacroLanguage } = require('./dist/index.cjs');

const parser = WowMacroLanguage.parser;

const code = '/cast [@mouseover] Fireball';
const tree = parser.parse(code);

console.log('Input:', code);
console.log('\nParsed tree:', tree.toString());
