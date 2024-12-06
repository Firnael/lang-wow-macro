# CodeMirror 6 language package template

This is an example repository containing a minimal [CodeMirror](https://codemirror.net/6/) language support package. The idea is to clone it, rename it, and edit it to create support for a new language.

Things you'll need to do (see the [language support example](https://codemirror.net/6/examples/lang-package/) for a more detailed tutorial):

 * `git grep EXAMPLE` and replace all instances with your language name.

 * Rewrite the grammar in `src/syntax.grammar` to cover your language. See the [Lezer system guide](https://lezer.codemirror.net/docs/guide/#writing-a-grammar) for information on this file format.

 * Adjust the metadata in `src/index.ts` to work with your new grammar.

 * Adjust the grammar tests in `test/cases.txt`.

 * Build (`npm run prepare`) and test (`npm test`).

 * Rewrite this readme file.

 * Optionally add a license.

 * Publish. Put your package on npm under a name like `codemirror-lang-EXAMPLE`.

 ## WoW macro specifications

https://wowwiki-archive.fandom.com/wiki/Making_a_macro#Syntax_overview

## Testing

This stuff is cryptic so you should write tests for it.

### Testing the completion code

You updated the completion logic (by updating the `src/completion.ts` file) and you want to test it.
Add a test in the `test/completion.ts` file and run the following command:

```bash
npm run test
```

### Testing the grammar

You updated the grammar (by updating the `syntax.grammar` file) and you want to test it.  
Add a case in the `test/cases.txt` file with this syntax :

```
# This is a comment for your case
/cast Fireball
==>
Program(
  Line(Command, String)
)
```

and run the following command:

```bash
npm run test:grammar
```