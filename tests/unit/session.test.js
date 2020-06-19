const assert = require('assert');
const User = require('../../src/modules/user/user.model');
const utils = require('../../src/helpers/utils');

describe('Session', function() {
    let user = {
        email_address: 'iron.man@mail.com',
        password: 'demo@123',
        name: 'Iron Man',
    }

    let userId;
    let encryptedPassword;
    before(async function() {
        await User.deleteMany({});
        const password = utils.generateHash(user.password);
        const savedUser = await User.create({...user, password: password});
        userId = savedUser._id;
        encryptedPassword = password;
    });

    it('Login with valid credentials', async function() {
        const savedUser = await User.findOne({email_address: user.email_address});
        if(savedUser) {
            let matched = utils.isPasswordValid(user.password, savedUser.password);  
            assert(matched);              
        }
        
    });

    it('Login with invalid credentials', async function() {
        const savedUser = await User.findOne({email_address: user.email_address});
        if(savedUser) {
            let matched = utils.isPasswordValid(user.password, encryptedPassword + 'random'); 
            assert(!matched); 
        }
        
    });

    after(async function(){
        await User.deleteMany({});
    });
});