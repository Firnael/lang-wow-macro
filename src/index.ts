import { parser } from "./syntax.grammar"
import { LRLanguage, LanguageSupport, HighlightStyle } from "@codemirror/language"
import { CompletionContext, completeFromList, CompletionResult } from "@codemirror/autocomplete"
import { styleTags, tags as t } from "@lezer/highlight"

export const WowMacroLanguage = LRLanguage.define({
  parser: parser.configure({
    props: [
      styleTags({
        ShowTooltip: t.annotation,
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

function myCompletions(context: CompletionContext): CompletionResult {
  let word = context.matchBefore(/\w*/)
  if (word == null || (word.from == word.to && !context.explicit)) {
    return {
      from: 0,
      options: []
    }
  }
  return {
    from: word.from,
    options: [
      { label: '#showtooltip ', type: 'annotation' },
      { label: '/cast ', type: 'labelName' },
      { label: '/use ', type: 'labelName' },
      { label: '/target ', type: 'labelName' },
      { label: '@focus', type: 'keyword' },
    ]
  }
}

export const WowMacroCompletion = WowMacroLanguage.data.of({
  autocomplete: myCompletions
})

export const WowMacroHighlightStyle = HighlightStyle.define([
  { tag: t.logicOperator, color: "#ffd000" }, // ';', '!'    => yellow
  { tag: t.annotation, color: "#8fbc8f" },    // ShowTooltip => dark sea green
  { tag: t.labelName, color: "#00bfff" },     // Command     => light blue
  { tag: t.variableName, color: "#9370db" },  // String      => purple
  { tag: t.keyword, color: "#ff00ff" },       // Condition   => magenta
  { tag: t.number, color: "#ffa500" },        // Id          => orange
])

export function WowMacro() {
  return new LanguageSupport(WowMacroLanguage, [WowMacroCompletion])
}