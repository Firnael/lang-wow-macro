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
]//.flatMap(i => [{ ...i, label: `[${i.label}` }, { ...i, label: `,${i.label}` }, { ...i, label: `, ${i.label}` }])

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
    if (getFirstCharacterOfWord(word) == '#') {
        result.from = word.from
        result.options = annotations
    }
    // matches either a "[" or a "," (with or without a trailing whitespace), implying we want to use a conditional
    if (getFirstCharacterOfWord(word) == '[') {
        result.from = word.from + 1
        result.options = conditions
    }
    else if(word.text.indexOf(',') >= 0 || word.text.indexOf(', ') >= 0) {
        let index = word.text.lastIndexOf(', ') // attention au +2 ici ?
        if(index < 0) {
            index = word.text.lastIndexOf(',')
        }
        result.from = word.from + index + 1
        result.options = conditions
    }

    // matches a "@" or "target=", implying we want to use the "target" conditional operator
    //else if (getFirstCharacterOfWord(word) == '@' || wordContains(word, '[@') || wordContains(word, ',@') || wordContains(word, ', @')) {
    if (wordMatches(word, new RegExp(/^(@|\[@|,@|, @)/))) {
        const index = word.text.lastIndexOf('@')
        result.from = word.from + index
        result.options = targets
    }

    // en vrai le "from" il faut que ça soit à partir du dernier caractère qui nous intéresse
    // en gros si on a le word "[@cursor,nodead" et qu'on ajoute une ',' le from doit commencer à la dernière ','
    // donc un word.text.lastIndexOf(',')

    return result
}

function getFirstCharacterOfWord(word: Word | null): string {
    return word ? word.text.substring(0, 1) : ''
}

function getLastCharacterOfWord(word: Word | null): string {
    return word ? word.text.substring(word.text.length-2, word.text.length-1) : ''
}

function wordContains(word: Word | null, content: string): boolean {
    return word ? (word.text.indexOf(content) >=0 ? true : false) : false
}

function wordMatches(word: Word | null, match: RegExp): boolean {
    return word ? match.test(word.text) : false
}

interface Word {
    from: number;
    to: number;
    text: string;
}