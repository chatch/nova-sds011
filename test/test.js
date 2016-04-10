'use strict'
let assert = require('assert')
let sds011 = require('../lib/sds011')

describe('sds011', function () {

    let crc = sds011.crc
    describe('#crc()', function () {
        it('should calculate correct crc', function () {
            assert.equal(136, crc(buf('aa c0 ea 00 0c 01 ab e6 88 ab')))
            assert.equal(100, crc(buf('aa c0 e0 00 f3 00 ab e6 64 ab')))
        })
    })

    let crcOk = sds011.crcOk
    describe('#crcOk()', function () {
        it('should check crc correctly', function () {
            assert.equal(false, crcOk(buf('aa c0 ea 22 0c 01 ab e6 88 ab')))
            assert.equal(true, crcOk(buf('aa c0 e0 00 f3 00 ab e6 64 ab')))
        })
    })

    describe('#parseMessage()', function () {
        it('should return undefined when crc does not match', function () {
            // expected crc 88 but calculated is different
            assert.equal(undefined, sds011(buf('aa c0 ea 22 0c 01 ab e6 88 ab')))
        })
        it('should return correct pm2.5 and pm10 values', function () {
            // expected crc 88 but calculated is different
            let pmValues = sds011(buf('aa c0 e0 00 f3 00 ab e6 64 ab'))
            assert.equal(22.4, pmValues.pm2_5)
            assert.equal(24.3, pmValues.pm10)
        })
    })

})

function buf(bufferStr) {
    return new Buffer(bufferStr.replace(/ /g, ''), 'hex')
}