Template.editMode.rendered = function() {
  nodeEditMode = false;
  edgeEditMode = false;
}

Template.editMode.events = {

        'change #toggle-edge-edit-mode': function(e,template) {
            var net = template.view.parentView.parentView._templateInstance.network.get();
            var edgeEditMode = e.target.checked;

            if (!edgeEditMode){
                net.edgehandles("disable");
            }
            else {
                net.edgehandles("enable")
            }
            return;

        }
}
