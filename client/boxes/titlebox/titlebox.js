Template.titlebox.created = function() {
    console.log(this);
    this.editMode = this.view.parentView._templateInstance.data.editMode;
}

Template.titlebox.helpers({
    isEditable : function() {
      console.log(this);
      return this.editMode
    }
})

Template.titlebox.events =  {
  'click #toggle-toolbox' : function() {
    $('#toolbox').toggle();
  },
  'click #toggle-algobox' : function() {
    $('#algobox').toggle();
  },
  'click #toggle-filterbox' : function() {
    $('#filterbox').toggle();
  }
}
