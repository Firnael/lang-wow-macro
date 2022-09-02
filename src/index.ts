import { parser } from "./syntax.grammar"
import { LRLanguage, LanguageSupport, HighlightStyle } from "@codemirror/language"
import { completeFromList } from "@codemirror/autocomplete"
import { styleTags, tags as t } from "@lezer/highlight"

export const WowMacroLanguage = LRLanguage.define({
  parser: parser.configure({
    props: [
      styleTags({
        ShowTooltip: t.annotation,
        Function: t.labelName,
        Name: t.variableName,
        Id: t.number,
        Condition: t.keyword,
        ConditionOperator: t.logicOperator,
        "( )": t.paren,
        "[ ]": t.bracket,
      })
    ]
  }),
  languageData: {
    commentTokens: { line: ";" }
  }
})

export const WowMacroCompletion = WowMacroLanguage.data.of({
  autocomplete: completeFromList([
    { label: '#showtooltip', type: 'annotation' },
    { label: '/cast', type: 'labelName' },
    { label: '/use', type: 'labelName' },
    { label: '/target', type: 'labelName' },
    { label: '[focus', type: 'keyword' },
    { label: '[@', type: 'keyword' }
  ])
})

export const WowMacroHighlightStyle = HighlightStyle.define([
  { tag: t.bracket, color: "#ffd000" },       // Brackets    => yellow
  { tag: t.logicOperator, color: "#ffd000" }, // ';'         => yellow
  { tag: t.annotation, color: "#8fbc8f" },    // ShowTooltip => dark sea green
  { tag: t.labelName, color: "#00bfff" },     // Function    => light blue
  { tag: t.variableName, color: "#9370db" },  // Name        => purple
  { tag: t.keyword, color: "#ff00ff" },       // Condition   => magenta
  { tag: t.number, color: "#ffa500" },        // Id          => orange
])

export function WowMacro() {
  return new LanguageSupport(WowMacroLanguage, [WowMacroCompletion])
}