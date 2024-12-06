import { CompletionContext, Completion, CompletionResult } from "@codemirror/autocomplete"

const commands: Completion[] = [
    { label: '/cast ', type: 'labelName', detail: "Cast a spell", boost: 100 },
    { label: '/use ', type: 'labelName', detail: "Use an item from equipment or inventory", boost: 99 },
    { label: '/stopcasting ', type: 'labelName', detail: "Cancel any cast currently happening" },
    { label: '/target ', type: 'labelName', detail: "Target the specified unit" },
    { label: '/cleartarget ', type: 'labelName', detail: "Leaves you with no target" },
    { label: '/focus ', type: 'labelName', detail: "Focus a target" },
    { label: '/assist ', type: 'labelName', detail: "Targets your target's target :)" }
]

const annotations: Completion[] = [
    {
        label: '#showtooltip ', type: 'annotation',
        detail: "Display the ability/item icon & tooltip",
        info: "If you selected the '?' icon, you can use this annotation to display an icon and a tooltip relative to your macro"
    },
    {
        label: '#show ', type: 'annotation',
        detail: "Display the ability/item icon"
    }
]

const conditions: Completion[] = [
    // { label: '@', type: 'keyword', detail: "Target operator (short for 'target=')" },
    { label: 'target=', type: 'keyword', detail: "Target operator", info: "The symbol '@' is a shortcut for this", apply: "@" },
    { label: 'dead', type: 'keyword', detail: "Target is dead" },
    { label: 'harm', type: 'keyword', detail: "Target can be harmed" },
    { label: 'help', type: 'keyword', detail: "Target can be helped" },
    { label: 'indoors', type: 'keyword', detail: "You are indoors" },
    { label: 'outdoors', type: 'keyword', detail: "You are outdoors" },
    { label: 'exists', type: 'keyword', detail: "You have a target right now" },
    { label: 'stance:', type: 'keyword', detail: "You are in a specific stance" },
    { label: 'form:', type: 'keyword', detail: "You are in a specific form" },
    { label: 'spec:', type: 'keyword', detail: "You are in a specific spec" },
    { label: 'talent:', type: 'keyword', detail: "You are using a specific talent" }
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

    return findCompletion(word)
}

// TODO : "[] action par défaut"
export function findCompletion(word: Word): CompletionResult {

    // matches a slash "/", implying we want to use a command
    if (getFirstCharacterOfWord(word) == '/') {
        return { from: word.from, options: commands }
    }
    // matches a "#", implying we want to use the "show*" directives
    if (getFirstCharacterOfWord(word) == '#') {
        return { from: word.from, options: annotations }
    }
    // matches a word containing a ","
    if (wordContains(word, ',')) {
        // get the last ',' index 
        const index = word.text.lastIndexOf(',')

        // verify comma is not followed by '@'
        const arobaseIndex = word.text.lastIndexOf('@')
        const spaceWithArobaseIndex = word.text.lastIndexOf(' @')

        if ((arobaseIndex < 0 && spaceWithArobaseIndex < 0)
            || (arobaseIndex > 0 && index > arobaseIndex)
                || (spaceWithArobaseIndex > 0 && index > spaceWithArobaseIndex)) {
            // the last ',' is AFTER the last '@' so we can continue
            let offset = 1 // offset changes if a space follow directly
            if (word.text[index + 1] === ' ') {
                offset = 2
            }
            return {
                from: word.from + index + offset,
                options: conditions
            }
        }
    }
    // matches a "@" or "target=", implying we want to use the "target" conditional operator
    if (wordContains(word, '@')) {
        const index = word.text.lastIndexOf('@')
        return { from: word.from + index, options: targets }
    }
    // matches a word starting with "[" and containing no "," implying we want to use a first conditional
    if (getFirstCharacterOfWord(word) == '[' && word.text.indexOf(',') < 0) {
        return { from: word.from + 1, options: conditions }
    }

    // no match found
    return { from: word.from, options: [] }
}

function getFirstCharacterOfWord(word: Word | null): string {
    return word ? word.text.substring(0, 1) : ''
}

function getLastCharacterOfWord(word: Word | null): string {
    return word ? word.text.substring(word.text.length - 2, word.text.length - 1) : ''
}

function wordContains(word: Word | null, content: string): boolean {
    return word ? (word.text.indexOf(content) >= 0 ? true : false) : false
}

function wordMatches(word: Word | null, match: RegExp): boolean {
    return word ? match.test(word.text) : false
}

export interface Word {
    from: number;
    to: number;
    text: string;
}