const { WowMacroLanguage } = require('./dist/index.cjs');
const parser = WowMacroLanguage.parser;

// Character commands 
console.log("\n=== Character commands ===");
const char1 = parser.parse("/follow [@party1]");
console.log(`/follow [@party1]: ${char1.toString()}`);
const char2 = parser.parse("/inspect [@target]");
console.log(`/inspect [@target]: ${char2.toString()}`);
const char3 = parser.parse("/trade [@target]");
console.log(`/trade [@target]: ${char3.toString()}`);

// PvP commands
console.log("\n=== PvP commands ===");
const pvp = parser.parse("/duel [@target]");
console.log(`/duel [@target]: ${pvp.toString()}`);

// Other combat commands
console.log("\n=== Other combat commands ===");
const combat = parser.parse("/startattack [@mouseover,harm]");
console.log(`/startattack [@mouseover,harm]: ${combat.toString()}`);

// All condition types
console.log("\n=== All condition types ===");
const all = parser.parse("/cast [combat,harm,nodead,exists,mod:shift,stance:1,equipped:shield,party,pet:exists,indoors,pvp] Complex Spell");
console.log(`All conditions: ${all.toString()}`);
