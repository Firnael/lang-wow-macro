import { parser } from "./syntax.grammar"
import { LRLanguage, LanguageSupport, HighlightStyle, indentNodeProp, foldNodeProp, foldInside, delimitedIndent } from "@codemirror/language"
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
        String: t.string,
        "( )": t.paren,
        "[ ]": t.bracket,
      })
    ]
  }),
  languageData: {
    commentTokens: { line: ";" }
  }
})

export function WowMacro() {
  return new LanguageSupport(WowMacroLanguage)
}

export const WowMacroHighlightStyle = HighlightStyle.define([
  { tag: t.annotation, color: "#ff0" },   // ShowTooltip => red
  { tag: t.labelName, color: "#00b" },    // Function    => light blue
  { tag: t.variableName, color: "#937" }, // Identifier  => purple
  { tag: t.keyword, color: "#fc6" },      // Condition   => magenta
  { tag: t.bracket, color: '#ffc' },      // Brackets    => yellow
  { tag: t.comment, color: "#f5d", fontStyle: "italic" }, // forest green
])
