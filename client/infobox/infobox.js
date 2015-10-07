Template.infobox.helpers({

    comments: function() {
        var type = Session.get('currentType') || "nodes",
            id = Session.get('currentId') || "node-000";
        var comments = Comments.find({"id" : id,  "type" : type }).fetch();
        return comments
    },

     currentSelection: function() {
        var id= Session.get('currentId'),
            type = Session.get('currentType'),
            item = {};

       if( type == "node") {
            item = Nodes.findOne({"data.id" : id});
        } else if (type== "edge"){
            item = Edges.findOne({"data.id" : id});
        }

        // append
        if (item.data) {
            if(item.data.data) delete(item.data.data.url)
            item.info = item.data.data;
        };

        return item;
    }
})

Template.infobox.events= {
    'click #closeInfoBox' : function(event){
        $("#infoBox").css('visibility', 'hidden');
    }
};
