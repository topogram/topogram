import { Session } from 'meteor/session'
Template.comments.helpers({
    comments: function() {
        var type = Session.get('currentType') || "nodes",
            id = Session.get('currentId') || "node-000"
        var comments = Comments.find({"id" : id,  "type" : type }).fetch()
        console.log(comments)
        return comments
    }
})
