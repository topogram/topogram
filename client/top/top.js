Template.top.rendered = function(){
    this.topograms = Topograms.find().fetch();
}

Template.top.helpers({
    topograms : function() {
        return Topograms.find().fetch();
    }
})
