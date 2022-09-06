import { CompletionContext, Completion, CompletionResult } from "@codemirror/autocomplete"

const commands: Completion[] = [
    { label: 'cast ', type: 'labelName' },
    { label: 'use ', type: 'labelName' },
    { label: 'target ', type: 'labelName' },
    { label: 'focus ', type: 'labelName' }
]

const annotations: Completion[] = [
    {
        label: 'showtooltip ', type: 'annotation',
        detail: "Display the ability/item icon & tooltip",
        info: "If you selected the '?' icon, you can use this annotation to display an icon relative to your macro"
    },
    {
        label: 'show ', type: 'annotation',
        detail: "Display the ability/item icon"
    }
]

const conditions: Completion[] = [
    { label: 'dead', type: 'keyword', detail: "Target is dead" },
    { label: 'harm', type: 'keyword', detail: "Target can be harmed" },
    { label: 'help', type: 'keyword', detail: "Target can be helped" },
    { label: 'indoors', type: 'keyword', detail: "You are indoors" },
    { label: 'outdoors', type: 'keyword', detail: "You are outdoors" },
    { label: 'exists', type: 'keyword', detail: "You have a target right now" }
]

const targets: Completion[] = [
    { label: 'cursor', type: 'keyword' },
    { label: 'mouseover', type: 'keyword' },
    { label: 'focus', type: 'keyword' },
    { label: 'player', type: 'keyword' },
    { label: 'target', type: 'keyword' },
    { label: 'targettarget', type: 'keyword' }
]

export function completions(context: CompletionContext): CompletionResult {
    let word = context.matchBefore(/\w*/)
    if (word == null || (word.from == word.to && !context.explicit)) {
        return { from: 0, options: [] }
    }

    const result: CompletionResult = {
        from: word.from,
        options: []
    }

    // matches a slash "/", implying we want to use a command
    if (context.matchBefore(/\//) != null) {
        result.options = commands
    }
    // matches a "#", implying we want to use the "show*" directives
    else if (context.matchBefore(/#/) != null) {
        result.options = annotations
    }
    // matches either a "[" or a "," (with or without a trailing whitespace), implying we want to use a conditional
    else if (context.matchBefore(/\[|,\s?/) != null) {
        result.options = conditions
    }
    // matches a "@", implying we want to use the "target=" operator
    else if (context.matchBefore(/@/) != null) {
        result.options = targets
    }
    else {
        result.options = new Array().concat(commands, annotations, conditions, targets)
    }

    return result
}