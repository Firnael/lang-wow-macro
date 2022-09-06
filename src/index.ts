import { parser } from "./syntax.grammar"
import { LRLanguage, LanguageSupport, HighlightStyle } from "@codemirror/language"
import { styleTags, tags as t } from "@lezer/highlight"
import { completions } from './completion'

export const WowMacroLanguage = LRLanguage.define({
  parser: parser.configure({
    props: [
      styleTags({
        ShowIconTooltip: t.annotation,
        Command: t.labelName,
        String: t.variableName,
        Id: t.number,
        Condition: t.keyword,
        ConditionOperator: t.logicOperator,
        ToggleOperator: t.logicOperator,
      })
    ]
  })
})

export const WowMacroCompletion = WowMacroLanguage.data.of({
  autocomplete: completions
})

export const WowMacroHighlightStyle = HighlightStyle.define([
  { tag: t.logicOperator, color: "#ffd000" }, // ';' '!'     => yellow
  { tag: t.annotation, color: "#8fbc8f" },    // ShowIconTooltip => dark sea green
  { tag: t.labelName, color: "#00bfff" },     // Command     => light blue
  { tag: t.variableName, color: "#9370db" },  // String      => purple
  { tag: t.keyword, color: "#ff00ff" },       // Condition   => magenta
  { tag: t.number, color: "#ffa500" },        // Id          => orange
])

export function WowMacro() {
  return new LanguageSupport(WowMacroLanguage, [WowMacroCompletion])
}