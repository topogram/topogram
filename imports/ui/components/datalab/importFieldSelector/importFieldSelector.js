Template.importSelectFieldOptional.created = function() {
  this.showSelectFields = new ReactiveVar(false) 
} 

Template.importSelectFieldOptional.helpers({
  'showSelectFields' : function() {
    // console.log(Templace.instance()) 
    // console.log(Template.instance().showSelectFields.get()) 
    return Template.instance().showSelectFields.get() 
  }
})

Template.importSelectFieldOptional.events({
  'change input[type="checkbox"]' : function(e, template) {
      // console.log(e.currentTarget.checked) 
      console.log(template) 
      template.showSelectFields.set( e.currentTarget.checked) 
      console.log(template.showSelectFields.get() ) 
  }
})
