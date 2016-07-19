import * as pjson  from '../package.json'
import { Meteor } from 'meteor/meteor'

Meteor.methods( {
  getVersion : function () {
    return pjson.version
  }
})
