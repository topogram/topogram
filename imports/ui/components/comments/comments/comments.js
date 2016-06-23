import { Session } from 'meteor/session'
import { Template } from 'meteor/template'
import { Comments } from '../../../../api/collections.js'

Template.comments.helpers({
    comments: function() {
        var type = Session.get('currentType') || "nodes",
            id = Session.get('currentId') || "node-000"
        var comments = Comments.find({"id" : id,  "type" : type }).fetch()
        console.log(comments)
        return comments
    }
})
