import { Accounts } from 'meteor/accounts-base'

import { Meteor } from 'meteor/meteor'
import { chai, assert } from 'meteor/practicalmeteor:chai';
import { resetDatabase } from 'meteor/xolvio:cleaner';

import {updateUserName} from './userMethods.js'

chai.expect();

resetDatabase() // delete all

if (Meteor.isServer) {
  describe('Users', function() {
    describe('methods', function () {
      it('should update username correctly', function (done) {

        const userData = {
          username : 'bla',
          password : 'password',
          email : 'a@b.com'
        }

        // create user
        const userId = Accounts.createUser(userData);

        const userBefore = Meteor.users.findOne(userId)
        assert.equal(userBefore.username, 'bla');

        updateUserName._execute({userId}, { userName :'kulustu' });

        const user = Meteor.users.findOne(userId)
        assert.equal(user.username, 'kulustu');
        done()
      })
    })
  })
}
