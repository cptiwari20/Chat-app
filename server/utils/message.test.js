const mocha = require('mocha');
const expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message');

describe('Generate Message', () =>{
    it('should generate new message', () =>{
        var from = "Admin";
        var text = "Some Message";
        var message = generateMessage(from, text);

        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({from, text});
    });
});
describe('Generate Location Message', () =>{
    it('should generate new location message', () =>{
        var from = "Admin";
        var latitude = 15;
        var longitude = 16;
        var url = `https://www.google.com/maps?q=${latitude},${longitude}`
        var message = generateLocationMessage(from, latitude, longitude);

        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({from, url});
    })
})