Template.advancedEditMode.rendered = function() {
  Session.set( 'advancedEditMode', false );
}

Template.advancedEditMode.helpers = {
  editModeOnOff : function(d) {
    return Session.get('advancedEditMode');
  }
}
Template.advancedEditMode.events = {

  'change #toggle-advanced-edit-mode': function(e,template) {
      console.log(template);

      var net = template.view.parentView.parentView.parentView.parentView._templateInstance.network.get()
      var advancedEditMode = e.target.checked;
      Session.set('advancedEditMode', advancedEditMode);

      // init mouse actions
      net.initActions()
  }
}
