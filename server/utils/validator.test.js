const mocha = require('mocha');
const expect = require('expect');
var {isRealString} = require('./validator');

describe('isRealString', () => {
    it('should reject non-string value', ()=>{
        var str = isRealString(55);
        expect(str).toBe(false);
    });
    it('should reject the string with only spaces', ()=>{
        var str = isRealString("     ");
        expect(str).toBe(false);
    });
    it('should allow the real string with no space', ()=>{
        var str = isRealString("Ram  s   ");
        expect(str).toBe(true);
    })
});