Template.single.helpers( {
    topogram: function() {
        var topogram = Topograms.findOne();
        // console.log(topogram);
        return topogram;
    },
});
