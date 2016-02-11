Template.titlebox.created = function() {
    this.editMode = this.data.editMode;
}

Template.titlebox.helpers({
    isEditable : function() {
      return this.editMode
    },
    topogram: function() {
        return topogram = Topograms.findOne();
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
