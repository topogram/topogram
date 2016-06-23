import { Template } from 'meteor/template'

Template.comment.helpers({
    comment: function () {
        return this.comment
    },
    random : function() {
        return Date.now() + "-"+Math.round( Math.random() * 1000000 )
    }
})
