const { parser } = require('./dist/index.cjs');

const code = '/cast [@mouseover] Fireball';
const tree = parser.parse(code);

console.log('Input:', code);
console.log('\nParsed tree:');
console.log(tree.toString());

let cursor = tree.cursor();
do {
  console.log(`${' '.repeat(cursor.depth * 2)}${cursor.name} ${cursor.from}-${cursor.to}`);
} while(cursor.next());
