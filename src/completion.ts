import {
  CompletionContext,
  Completion,
  CompletionResult,
} from "@codemirror/autocomplete";

// Commandes de base WoW (commençant par '/')
const commands: Completion[] = [
  { label: "/cast ", type: "labelName", detail: "Cast a spell", boost: 100 },
  {
    label: "/use ",
    type: "labelName",
    detail: "Use an item from equipment or inventory",
    boost: 99,
  },
  {
    label: "/stopcasting ",
    type: "labelName",
    detail: "Cancel any cast currently happening",
  },
  { label: "/target ", type: "labelName", detail: "Target the specified unit" },
  {
    label: "/cleartarget ",
    type: "labelName",
    detail: "Leaves you with no target",
  },
  { label: "/focus ", type: "labelName", detail: "Focus a target" },
  {
    label: "/assist ",
    type: "labelName",
    detail: "Targets your target's target",
  },
];

// Annotations de macro (commençant par '#')
const annotations: Completion[] = [
  {
    label: "#showtooltip ",
    type: "annotation",
    detail: "Display the ability/item icon & tooltip",
    info: "If you selected the '?' icon, you can use this annotation to display an icon and a tooltip relative to your macro",
  },
  {
    label: "#show ",
    type: "annotation",
    detail: "Display the ability/item icon",
  },
];

// Opérateurs de ciblage (@ ou target=)
const targetOperators: Completion[] = [
  {
    label: "@",
    type: "keyword",
    detail: "Target operator (short for 'target=')",
    boost: 100,
  },
  { label: "target=", type: "keyword", detail: "Target operator", boost: 99 },
];

// Types de cibles possibles (après @ ou target=)
const targetTypes: Completion[] = [
  { label: "player", type: "keyword", detail: "You" },
  { label: "target", type: "keyword", detail: "Your current target" },
  { label: "focus", type: "keyword", detail: "Your focus target" },
  {
    label: "mouseover",
    type: "keyword",
    detail: "Unit under your mouse cursor",
  },
  { label: "pet", type: "keyword", detail: "Your pet" },
  { label: "none", type: "keyword", detail: "No target" },
  { label: "cursor", type: "keyword", detail: "Ground location under cursor" },
  { label: "vehicle", type: "keyword", detail: "Your vehicle" },
  { label: "party1", type: "keyword", detail: "First party member" },
  { label: "partypet1", type: "keyword", detail: "First party member's pet" },
  { label: "raid1", type: "keyword", detail: "First raid member" },
  { label: "raidpet1", type: "keyword", detail: "First raid member's pet" },
  { label: "arena1", type: "keyword", detail: "First arena enemy" },
  { label: "boss1", type: "keyword", detail: "First boss" },
];

// Modificateurs de touches (shift, ctrl, alt et leurs combinaisons)
const modifiers: Completion[] = [
  { label: "mod:shift", type: "keyword", detail: "Shift key is pressed" },
  { label: "mod:ctrl", type: "keyword", detail: "Control key is pressed" },
  { label: "mod:alt", type: "keyword", detail: "Alt key is pressed" },
  {
    label: "mod:shift,alt",
    type: "keyword",
    detail: "Shift and Alt keys are pressed",
  },
  {
    label: "mod:shift,ctrl",
    type: "keyword",
    detail: "Shift and Control keys are pressed",
  },
  {
    label: "mod:alt,ctrl",
    type: "keyword",
    detail: "Alt and Control keys are pressed",
  },
  {
    label: "mod:shift,alt,ctrl",
    type: "keyword",
    detail: "All modifier keys are pressed",
  },
];

// Conditions liées au combat
const combatConditions: Completion[] = [
  { label: "combat", type: "keyword", detail: "You are in combat" },
  { label: "nocombat", type: "keyword", detail: "You are not in combat" },
  { label: "harm", type: "keyword", detail: "Target can be harmed" },
  { label: "help", type: "keyword", detail: "Target can be helped" },
  { label: "noharm", type: "keyword", detail: "Target cannot be harmed" },
  { label: "nohelp", type: "keyword", detail: "Target cannot be helped" },
  { label: "pvp", type: "keyword", detail: "PvP is enabled" },
  { label: "nopvp", type: "keyword", detail: "PvP is disabled" },
  { label: "pvpcombat", type: "keyword", detail: "In PvP combat" },
  { label: "nopvpcombat", type: "keyword", detail: "Not in PvP combat" },
];

// Conditions liées au statut du personnage/cible
const statusConditions: Completion[] = [
  { label: "exists", type: "keyword", detail: "Target exists" },
  { label: "dead", type: "keyword", detail: "Target is dead" },
  { label: "nodead", type: "keyword", detail: "Target is not dead" },
  { label: "alive", type: "keyword", detail: "Target is alive" },
  { label: "mounted", type: "keyword", detail: "You are mounted" },
  { label: "nomounted", type: "keyword", detail: "You are not mounted" },
  { label: "stealth", type: "keyword", detail: "You are stealthed" },
  { label: "nostealth", type: "keyword", detail: "You are not stealthed" },
  { label: "possessed", type: "keyword", detail: "You are possessed" },
  { label: "nopossessed", type: "keyword", detail: "You are not possessed" },
  { label: "charmed", type: "keyword", detail: "You are charmed" },
  { label: "nocharmed", type: "keyword", detail: "You are not charmed" },
];

// Conditions liées à l'environnement
const environmentConditions: Completion[] = [
  { label: "indoors", type: "keyword", detail: "You are indoors" },
  { label: "outdoors", type: "keyword", detail: "You are outdoors" },
  { label: "swimming", type: "keyword", detail: "You are swimming" },
  { label: "noswimming", type: "keyword", detail: "You are not swimming" },
  { label: "flying", type: "keyword", detail: "You are flying" },
  { label: "noflying", type: "keyword", detail: "You are not flying" },
  { label: "flyable", type: "keyword", detail: "Flying is possible here" },
  {
    label: "noflyable",
    type: "keyword",
    detail: "Flying is not possible here",
  },
  { label: "floating", type: "keyword", detail: "You are floating" },
  { label: "nofloating", type: "keyword", detail: "You are not floating" },
  { label: "falling", type: "keyword", detail: "You are falling" },
  { label: "nofalling", type: "keyword", detail: "You are not falling" },
];

// Conditions liées aux postures et formes
const stanceConditions: Completion[] = [
  { label: "stance:1", type: "keyword", detail: "You are in stance 1" },
  { label: "stance:2", type: "keyword", detail: "You are in stance 2" },
  { label: "form:1", type: "keyword", detail: "You are in form 1" },
  { label: "form:2", type: "keyword", detail: "You are in form 2" },
  { label: "stealth", type: "keyword", detail: "You are stealthed" },
  { label: "shadowform", type: "keyword", detail: "You are in shadowform" },
  { label: "moonkin", type: "keyword", detail: "You are in moonkin form" },
  { label: "bear", type: "keyword", detail: "You are in bear form" },
  { label: "cat", type: "keyword", detail: "You are in cat form" },
];

// Conditions liées aux barres d'action
const barConditions: Completion[] = [
  { label: "actionbar:1", type: "keyword", detail: "Action bar 1 is active" },
  { label: "bonusbar:5", type: "keyword", detail: "Bonus bar 5 is active" },
  { label: "possessbar", type: "keyword", detail: "Possess bar is active" },
  { label: "overridebar", type: "keyword", detail: "Override bar is active" },
  { label: "vehicleui", type: "keyword", detail: "Vehicle UI is active" },
];

/**
 * Fonction principale de complétion
 * @param context - Le contexte de complétion fourni par CodeMirror
 * @returns Un résultat de complétion ou null si aucune suggestion n'est appropriée
 */
export function CompletionFunction(
  context: CompletionContext
): CompletionResult | null {
  // Recherche le mot en cours de saisie qui commence par #, @, / ou [
  let word = context.matchBefore(/[#@/\[].*/);
  if (!word) return null;

  let options: Completion[] = [];
  let from = word.from;

  // Détermine les options de complétion en fonction du premier caractère
  if (word.text.startsWith("#")) {
    // Les annotations ne sont valides qu'au début de la ligne
    if (word.from === 0) {
      options = annotations;
    }
  } else if (word.text.startsWith("/")) {
    // Les commandes ne sont valides qu'au début de la ligne
    if (word.from === 0) {
      options = commands;
    }
  } else if (word.text.startsWith("[")) {
    // Dans les crochets, toutes les conditions sont disponibles
    options = [
      ...combatConditions,
      ...statusConditions,
      ...environmentConditions,
      ...stanceConditions,
      ...barConditions,
      ...targetOperators,
      ...modifiers,
    ];
  } else if (word.text.startsWith("@")) {
    // Après @, seules les cibles sont disponibles
    options = targetTypes;
  }

  // Filtre les options en fonction du texte déjà saisi
  if (options.length > 0) {
    const search = word.text.slice(1).toLowerCase();
    options = options.filter((opt) => opt.label.toLowerCase().includes(search));
  }

  // Retourne les suggestions filtrées
  return {
    from,
    options,
    validFor: /^[#@/\[].*$/, // Expression régulière validant le format des suggestions
  };
}

// Export de la fonction de complétion pour utilisation par CodeMirror
export const completions = CompletionFunction;
