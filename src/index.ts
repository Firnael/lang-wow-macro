import { parser } from "./syntax.grammar"
import { LRLanguage, LanguageSupport, HighlightStyle } from "@codemirror/language"
import { CompletionContext, Completion, CompletionResult } from "@codemirror/autocomplete"
import { styleTags, tags as t } from "@lezer/highlight"

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

function myCompletions(context: CompletionContext): CompletionResult {
  let word = context.matchBefore(/\w*/)
  if (word == null || (word.from == word.to && !context.explicit)) {
    return {
      from: 0,
      options: []
    }
  }

  const result: CompletionResult = {
    from: word.from,
    options: []
  }

  // matches a slash "/", implying we want to use a command
  if (context.matchBefore(/\//) != null) {
    result.options = [
      { label: 'cast ', type: 'labelName' },
      { label: 'use ', type: 'labelName' },
      { label: 'target ', type: 'labelName' },
      { label: 'focus ', type: 'labelName' }
    ]
  }
  // matches a "#", implying we want to use the "show*" directives
  else if (context.matchBefore(/#/) != null) {
    result.options = [
      { label: 'showtooltip ', type: 'annotation', detail: "Display the ability/item icon & tooltip", info: "If you selected the '?' icon, you can use this annotation to display an icon relative to your macro" },
      { label: 'show ', type: 'annotation', detail: "Display the ability/item icon" }
    ]
  }
  // matches either a "[" or a "," (with or without a trailing whitespace), implying we want to use a conditional
  else if (context.matchBefore(/\[|,\s?/) != null) {
    result.options = [
      { label: 'dead', type: 'keyword', detail: "Target is dead" },
      { label: 'harm', type: 'keyword', detail: "Target can be harmed" },
      { label: 'help', type: 'keyword', detail: "Target can be helped" },
      { label: 'indoors', type: 'keyword', detail: "You are indoors" },
      { label: 'outdoors', type: 'keyword', detail: "You are outdoors" },
      { label: 'exists', type: 'keyword', detail: "You have a target right now" }
    ]
  }
  // matches a "@", implying we want to use the "target=" operator
  else if (context.matchBefore(/@/) != null) {
    result.options = [
      { label: 'cursor', type: 'keyword' },
      { label: 'mouseover', type: 'keyword' },
      { label: 'focus', type: 'keyword' },
      { label: 'player', type: 'keyword' },
      { label: 'target', type: 'keyword' },
      { label: 'targettarget', type: 'keyword' }
    ]
  }

  return result
}

export const WowMacroCompletion = WowMacroLanguage.data.of({
  autocomplete: myCompletions
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