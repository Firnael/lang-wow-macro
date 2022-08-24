import {parser} from "./syntax.grammar"
import {LRLanguage, LanguageSupport, indentNodeProp, foldNodeProp, foldInside, delimitedIndent} from "@codemirror/language"
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
