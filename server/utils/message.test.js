const mocha = require('mocha');
const expect = require('expect');
var {generateMessage} = require('./message');

describe('Generate Message', () =>{
    it('should generate new message', () =>{
        var from = "Admin";
        var text = "Some Message";
        var message = generateMessage(from, text);

        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({from, text});
    })
})