Template.editMode.rendered = function() {
  nodeEditMode = false;
  edgeEditMode = false;
}

Template.editMode.events = {

        'click .toggle-node-edit-mode': function(e,template) {
            var net = template.view.parentView.parentView._templateInstance.network.get().net;
            nodeEditMode = !nodeEditMode
            console.log("nodeEditMode", nodeEditMode)
            if (!nodeEditMode){
                net.edgehandles("disable");
                $(e.target).text("node edit").toggleClass("btn-flat")
            }
            else {
                net.edgehandles("enable")
                $(e.target).text("node edit on").toggleClass("btn-flat")
            }
            return;

        },
        'click .toggle-edge-edit-mode': function(e,template) {
            var net = template.view.parentView.parentView._templateInstance.network.get().net;
            edgeEditMode = !edgeEditMode
            console.log("edgeEditMode", edgeEditMode)
            if (!edgeEditMode){
                net.edgehandles("disable");
                $(e.target).text("edge edit").toggleClass("btn-flat")
            }
            else {
                net.edgehandles("enable")
                $(e.target).text("edge edit on").toggleClass("btn-flat")
            }
            return;
        }
}
