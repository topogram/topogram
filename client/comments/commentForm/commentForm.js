Template.commentForm.events = {
    'click #submit': function(e){
        e.preventDefault();
        var body = $('#body').val();
        var type = Session.get('currentType') || "nodes";
        var id = Session.get('currentId') || "node-000";

        if(body !="")  {
            Meteor.call("addComment",  id, type, body, Meteor.userId());
            $('#body').val('');  // reset textarea display
        }
    }

}
