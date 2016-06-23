import './commentBox.html'
import { Template } from 'meteor/templating'
import { Session } from 'meteor/session';
import { Comments } from '../../../../api/collections.js'
import '../../comments/commentForm/commentForm.js'

import $ from 'meteor/jquery'

Template.commentBox.rendered = function(){
    $("#commentBox").hide()
}

Template.commentBox.helpers({
  comments: function() {
      var type = Session.get( 'currentType' ) || 'node',
          id = Session.get( 'currentId' ) || 'node-000'
      var comments = Comments.find( {
          'id': id,
          'type': type
      } ).fetch()
      return comments
  },
  isSelected : function() {
    return (Session.get( 'currentId') && Session.get( 'currentType'))? true : false
  }
})
