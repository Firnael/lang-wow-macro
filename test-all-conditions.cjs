const { WowMacroLanguage } = require('./dist/index.cjs');
const parser = WowMacroLanguage.parser;

const code = "/cast [combat,harm,nodead,exists,mod:shift,stance:1,equipped:shield,party,pet:exists,indoors,pvp] Complex Spell";
const tree = parser.parse(code);

console.log("Input:", code);
console.log("Tree:", tree.toString());

// Let's traverse the tree to see details
let cursor = tree.cursor();
do {
  console.log(`  ${" ".repeat(cursor.depth * 2)}${cursor.name} (${cursor.from}-${cursor.to})`);
} while (cursor.next());
