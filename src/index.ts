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
        "[ ]": t.bracket
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
  {tag: t.labelName, color: "#61ab4d"},
  {tag: t.variableName, color: "#fc6"},
  {tag: t.keyword, color: "#fc6fff"},
  {tag: t.comment, color: "#f5d", fontStyle: "italic"}
])
