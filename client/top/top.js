Template.top.rendered = function(){
    this.networks = Networks.find().fetch();
}

Template.top.helpers({
    networks : function() {
        return Networks.find().fetch();
    }
})
