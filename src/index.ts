import {parser} from "./syntax.grammar"
import {LRLanguage, LanguageSupport, HighlightStyle, indentNodeProp, foldNodeProp, foldInside, delimitedIndent} from "@codemirror/language"
import {styleTags, tags as t} from "@lezer/highlight"

export const WowMacroLanguage = LRLanguage.define({
  parser: parser.configure({
    props: [
      indentNodeProp.add({
        Application: delimitedIndent({closing: ")", align: false})
      }),
      foldNodeProp.add({
        Application: foldInside
      }),
      styleTags({
        Function: t.labelName,
        Identifier: t.variableName,
        Condition: t.keyword,
        Boolean: t.bool,
        String: t.string,
        "( )": t.paren,
        "[ ]": t.bracket,
      })
    ]
  }),
  languageData: {
    commentTokens: {line: ";"}
  }
})

export function WowMacro() {
  return new LanguageSupport(WowMacroLanguage)
}

export const WowMacroHighlightStyle = HighlightStyle.define([
  {tag: t.labelName, color: "#v"}, // light green
  {tag: t.variableName, color: "#fc6"}, // yellow
  {tag: t.keyword, color: "#fc6fff"}, // magenta
  {tag: t.comment, color: "#f5d", fontStyle: "italic"} // forest green
])
