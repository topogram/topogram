import { Meteor } from 'meteor/meteor'

export const updateUserName = new ValidatedMethod({
  name: 'user.updateUserName',
  validate: new SimpleSchema({ 'userName': { type: String } }).validator(),
  run({ userName, userId=this.userId }) {

    if(!userId) return

    return Meteor.users.update(
      userId,
      {$set: {"username": userName}}
    );
  }
})
