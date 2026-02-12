const { WowMacroLanguage } = require('./dist/index.cjs');
const parser = WowMacroLanguage.parser;

const tests = [
  { name: "[@mouseover]", code: "/cast [@mouseover] Fireball" },
  { name: "[stance:1]", code: "/cast [stance:1] Shield Bash" },
  { name: "[equipped:shield]", code: "/cast [equipped:shield] Shield Bash" },
  { name: "[pet:exists]", code: "/cast [pet:exists] Fireball" },
  { name: "[channeling]", code: "/stopcasting [channeling]" },
  { name: "[button:2]", code: "/cast [button:2] Spell" },
  { name: "[actionbar:1]", code: "/cast [actionbar:1] Spell" },
  { name: "[spec:1]", code: "/cast [spec:1] Spell" },
  { name: "[talent:1/2]", code: "/cast [talent:1/2] Spell" },
];

tests.forEach(test => {
  const tree = parser.parse(test.code);
  console.log(`\n${test.name}:`);
  console.log(`  Input: ${test.code}`);
  console.log(`  Tree:  ${tree.toString()}`);
});
