import { parser } from "./syntax.grammar"
import { LRLanguage, LanguageSupport, HighlightStyle, indentNodeProp, foldNodeProp, foldInside, delimitedIndent } from "@codemirror/language"
import { completeFromList } from "@codemirror/autocomplete"
import { styleTags, tags as t } from "@lezer/highlight"


export const WowMacroLanguage = LRLanguage.define({
  parser: parser.configure({
    props: [
      indentNodeProp.add({
        Application: delimitedIndent({ closing: ")", align: false })
      }),
      foldNodeProp.add({
        Application: foldInside
      }),
      styleTags({
        ShowTooltip: t.annotation,
        Function: t.labelName,
        Identifier: t.variableName,
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
    {label: "/cast", type: "labelName"},
    {label: "/use", type: "labelName"},
    {label: "/target", type: "labelName"},
  ])
})

export const WowMacroHighlightStyle = HighlightStyle.define([
  { tag: t.bracket, color: "#ffd000" },       // Brackets    => yellow
  { tag: t.logicOperator, color: "#ffd000" }, // ';'         => yellow
  { tag: t.annotation, color: "#8fbc8f" },    // ShowTooltip => dark sea green
  { tag: t.labelName, color: "#00bfff" },     // Function    => light blue
  { tag: t.variableName, color: "#9370db" },  // Identifier  => purple
  { tag: t.keyword, color: "#ff00ff" },       // Condition   => magenta
])

export function WowMacro() {
  return new LanguageSupport(WowMacroLanguage, [WowMacroCompletion])
}