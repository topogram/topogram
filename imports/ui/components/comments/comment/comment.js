import { Template } from 'meteor/templating'
import * as moment from 'moment'
import './comment.html'

Template.comment.helpers({
    random : function() {
        return Date.now() + "-"+Math.round( Math.random() * 1000000 )
    },
    formattedDate: function(){
      return moment.default(Template.instance().data.comment.date).fromNow()
  }
})
