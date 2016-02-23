Template.titlebox.created = function() {
    this.editMode = this.data.editMode;
    $(".collapsible").collapsible();
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
  },
  'click #toggle-commentbox' : function() {
    $('#commentBox').toggle();
  },
  'click #download-png' : function() {
    console.log(Template.instance());
    var network = Template.instance().view.parentView.parentView._templateInstance.network.get()
    var png =  network.png({
      // 'full' : true
    });
    var a = document.createElement("a");
	  a.download = "network.png";
	  a.href = png;
	  a.click();

  }
}
