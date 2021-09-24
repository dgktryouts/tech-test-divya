import { expect } from 'chai';
import { decodeAuthenticationHeader, verifyDecodedToken  } from  './userHandler'


describe('user handler', async () => {
    it('should respond with empty string when an invalid token is passed', async () => {
        const decodedToken = decodeAuthenticationHeader('WF0dEBnbWFpbC5jb206dGhpcyBpcyBhIHZAbGlkIHBhc3N3b3JkIQ==');
        expect(decodedToken).to.equal('');
    });

    it('should respond with status VALID USER when an valid token is passed', async () => {
        const decodedToken = decodeAuthenticationHeader('Basic bWF0dEBnbWFpbC5jb206dGhpcyBpcyBhIHZAbGlkIHBhc3N3b3JkIQ==');
        expect(decodedToken).to.equal('matt@gmail.com:this is a v@lid password!');
    });

    it('should respond with status VALID USER when an valid username and password is passed', async () => {
        const verifyTokenStatus = verifyDecodedToken('jake@microsoft.com', 'Ev9LDHVXVm0jlVkyUpm3cK&DTxvzX@of7USM3plzoX9A');
        expect(verifyTokenStatus).to.equal('VALID USER');
    });

    it('should respond with status INVALID USER when an invalid username is passed', async () => {
        const verifyTokenStatus = verifyDecodedToken('jakee@microsoft.com', 'Ev9LDHVXVm0jlVkyUpm3cK&DTxvzX@of7USM3plzoX9A');
        expect(verifyTokenStatus).to.equal('INVALID USER');
    });
    it('should respond with status INVALID USER when an invalid password is passed', async () => {
        const verifyTokenStatus = verifyDecodedToken('jake@microsoft.com', 'Ev9DHVXVm0jlVkyUpm3cK&DTxvzX@of7USM3plzoX9A');
        expect(verifyTokenStatus).to.equal('INVALID USER');
    });

})