import { CompletionContext, Completion, CompletionResult } from "@codemirror/autocomplete"

const commands: Completion[] = [
    { label: '/cast ', type: 'labelName', detail: "Cast a spell" },
    { label: '/use ', type: 'labelName', detail: "Use an item from equipment or inventory" },
    { label: '/target ', type: 'labelName', detail: "Target the specified unit" },
    { label: '/focus ', type: 'labelName', detail: "Focus a target" },
    { label: '/stopcasting ', type: 'labelName', detail: "Cancel any cast currently happening" },
    { label: '/assist ', type: 'labelName', detail: "Targets your target's target :)" },
    { label: '/cleartarget ', type: 'labelName', detail: "Leaves you with no target" }
]

const annotations: Completion[] = [
    {
        label: '#showtooltip ', type: 'annotation',
        detail: "Display the ability/item icon & tooltip",
        info: "If you selected the '?' icon, you can use this annotation to display an icon relative to your macro"
    },
    {
        label: '#show ', type: 'annotation',
        detail: "Display the ability/item icon"
    }
]

const conditions: Completion[] = [
    { label: '@', type: 'keyword', detail: "Target operator (short for 'target=')" },
    { label: 'target=', type: 'keyword', detail: "Target operator" },
    { label: 'dead', type: 'keyword', detail: "Target is dead" },
    { label: 'harm', type: 'keyword', detail: "Target can be harmed" },
    { label: 'help', type: 'keyword', detail: "Target can be helped" },
    { label: 'indoors', type: 'keyword', detail: "You are indoors" },
    { label: 'outdoors', type: 'keyword', detail: "You are outdoors" },
    { label: 'exists', type: 'keyword', detail: "You have a target right now" }
].flatMap(i => [{ ...i, label: `[${i.label}` }, { ...i, label: `,${i.label}` }, { ...i, label: `, ${i.label}` }])

const targets: Completion[] = [
    { label: '@cursor', type: 'keyword', detail: "Used with items and spells using a reticule" },
    { label: '@mouseover', type: 'keyword', detail: "The unit under your mouse cursor" },
    { label: '@focus', type: 'keyword', detail: "Your focus" },
    { label: '@player', type: 'keyword', detail: "Yourself" },
    { label: '@target', type: 'keyword', detail: "Your target" },
    { label: '@targettarget', type: 'keyword', detail: "The target of your target" }
]

export function completions(context: CompletionContext): CompletionResult {
    const result: CompletionResult = {
        from: 0,
        options: []
    }

    // check what "word" we are currently writing
    const word = context.matchBefore(/\S*/)
    if (word == null || (word.from == word.to && !context.explicit)) {
        return result
    }

    // matches a slash "/", implying we want to use a command
    if (getFirstCharacterOfWord(word) == '/') {
        result.from = word.from
        result.options = commands
    }
    // matches a "#", implying we want to use the "show*" directives
    else if (getFirstCharacterOfWord(word) == '#') {
        result.from = word.from
        result.options = annotations
    }
    // matches either a "[" or a "," (with or without a trailing whitespace), implying we want to use a conditional
    else if (getFirstCharacterOfWord(word) == '[' || getFirstCharacterOfWord(word) == ',') {
        result.from = word.from
        result.options = conditions
    }
    // matches a "@" or "target=", implying we want to use the "target" conditional operator
    else if (getFirstCharacterOfWord(word) == '@') {
        result.from = word.from
        result.options = targets
    }

    return result
}

function getFirstCharacterOfWord(word: Word | null) {
    if (word) {
        return word.text.substring(0, 1)
    }
    return 0
}

interface Word {
    from: number;
    to: number;
    text: string;
}