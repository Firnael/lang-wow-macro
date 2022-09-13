//@ts-check
import { CompletionFunction } from "../dist/index.js"
import * as assert from 'assert'

describe('completion function', function() {

    it('should return #show and #showtooltip as options when input is "#"', function() {
        // given
        const word = { from: 0, to: 1, text: '#' }

        // when
        const result = CompletionFunction(word)

        // then
        assert.equal(result.from, 0)
        assert.equal(result.options.length, 2) // only annotations
        assert.deepEqual(result.options[0].label, '#showtooltip ')
        assert.deepEqual(result.options[1].label, '#show ')
    })

    it('should return commands as options when input is "/"', function() {
        // given
        const word = { from: 0, to: 1, text: '/' }

        // when
        const result = CompletionFunction(word)

        // then
        assert.equal(result.from, 0)
        assert.equal(result.options.length, 7) // only commands
    })

    it('should return targets as options when input is "@"', function() {
        // given
        const word = { from: 0, to: 1, text: '@' }

        // when
        const result = CompletionFunction(word)

        // then
        assert.equal(result.from, 0)
        assert.equal(result.options.length, 6) // only targets
    })

    it('should return conditionals as options when input is "[', function() {
        // given
        const word = { from: 0, to: 1, text: '[' }

        // when
        const result = CompletionFunction(word)

        // then
        assert.equal(result.from, 1)
        assert.equal(result.options.length, 11) // only conditionals
    })

    it('should return conditionals as options when input is "[@cursor,"', function() {
        // given
        const word = { from: 0, to: 10, text: '[@cursor,' }

        // when
        const result = CompletionFunction(word)

        // then
        assert.equal(result.from, 9)
        assert.equal(result.options.length, 11) // only conditionals
    })

    it('should return conditionals as options when input is "[harm, nodead,"', function() {
        // given
        const word = { from: 0, to: 14, text: '[harm, nodead,' }

        // when
        const result = CompletionFunction(word)

        // then
        assert.equal(result.from, 14)
        assert.equal(result.options.length, 11) // only conditionals
    })

    it('should return conditionals as options when input is "[harm, nodead, "', function() {
        // given
        const word = { from: 0, to: 15, text: '[harm, nodead, ' }

        // when
        const result = CompletionFunction(word)

        // then
        assert.equal(result.from, 15)
        assert.equal(result.options.length, 11) // only conditionals
    })

    it('should return targets as options when input is "[harm, nodead, @"', function() {
        // given
        const word = { from: 0, to: 16, text: '[harm, nodead, @' }

        // when
        const result = CompletionFunction(word)

        // then
        assert.equal(result.from, 15)
        assert.equal(result.options.length, 6) // only targets
    })

})
