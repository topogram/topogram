Template.chi2.events = {
    'change #chi2NodeViewParam': function(e, template) {

        var net = template.view.parentView.parentView._templateInstance.network.get().net;
        //var valEdg = $(e.currentTarget).find('value').val();
        var valchiNode = parseFloat(chi2NodeViewParam.value);


        console.log("values", valchiNode);
        var dataChi2Node1 = [];
        var dataChi2Node2 = [];
        console.log("dataChi2Node1", dataChi2Node1);

        net.nodes().forEach(function(ele) {


            dataChi2Node1.push(parseFloat(ele.data().width));
            //TODO: or centrality if DATA2 is empty
            dataChi2Node2.push(parseFloat(ele.data().data2));
        })
        console.log("I'm in chi2")
        console.log(dataChi2Node1);
        console.log(dataChi2Node2);
        var unique1 = {};
        var distinct1 = [];
        dataChi2Node1.forEach(function(x) {
            if (!unique1[x]) {
                distinct1.push(x);
                unique1[x] = true;
            }
        });

        var unique2 = {};
        var distinct2 = [];
        dataChi2Node2.forEach(function(x) {
            if (!unique2[x]) {
                distinct2.push(x);
                unique2[x] = true;
            }
        });
        unique1 = unique1.sort;
        distinct1 = distinct1.sort;
        unique2 = unique2.sort;
        distinct2 = distinct2.sort;

        console.log("unique1", unique1.sort);
        console.log("distinct1", distinct1.sort);
        console.log("unique2", unique2.sort);
        console.log("distinct2", distinct2.sort);























        // var averageEd = average(dataChi2Node1);
        // var standardDeviationEd = standardDeviation(dataChi2Node1);
        // console.log("averageEd", averageEd);
        // console.log("standardDeviationEd", standardDeviationEd);

        // //FOR INIT, NOT SURE IT IS NEEDED BUT HEY... IT WORKS
        // if (valEdg > 6) {
        //     valEdg = 1;
        //     console.log("sigma value set too high, so taking 1 instead")
        // }
        // net.edges().forEach(function(ele) {
        //     //FIXME:
        //     ele.data().count = ele.data().width
        //     var widthEd = ele.data().count;
        //     var zIndexEd = 10;
        //     //TODO: D3 SCALE

        //     if (widthEd <= (averageEd - ((valEdg + 4) * standardDeviationEd)) || widthEd >= (averageEd + ((valEdg + 4) * standardDeviationEd))) {
        //         color = '#FF1010'
        //         zIndexEd = 10
        //     } else if (widthEd <= (averageEd - ((valEdg + 3) * standardDeviationEd)) || widthEd >= (averageEd + ((valEdg + 3) * standardDeviationEd))) {
        //         color = '#EC5350'
        //         zIndexEd = 9
        //     } else if (widthEd <= (averageEd - ((valEdg + 2) * standardDeviationEd)) || widthEd >= (averageEd + (valEdg + 2) * standardDeviationEd)) {
        //         color = '#42A5F5'
        //         zIndexEd = 8
        //     } else if (widthEd <= (averageEd
        //      - ((valEdg + 1) * standardDeviationEd)) || widthEd >= (averageEd + (valEdg + 1) * standardDeviationEd)) {
        //         color = '#2BBBAD'
        //         zIndexEd = 7
        //     } else if (widthEd <= (averageEd - ((valEdg) * standardDeviationEd)) || widthEd >= (averageEd + (valEdg) * standardDeviationEd)) {
        //         color = '#20B0A0'
        //         zIndexEd = 5
        //     } else if (widthEd <= (averageEd + (valEdg * standardDeviationEd)) && widthEd >= (averageEd - (valEdg * standardDeviationEd))) {
        //         color = '#EEEEEE'
        //         zIndexEd = 4
        //     } else {
        //         console.log("FOR UNCLASSIFIEDS")
        //         console.log(widthEd);
        //         console.log("averageEd", averageEd);
        //         console.log("standardDeviationEd", standardDeviationEd);
        //         color = '#000000'
        //     }
        //     ele.style({
        //         'line-color': ele.data('starred') ? 'yellow' : color,
        //         'z-index': ele.data('starred') ? 10 : zIndexEd
        //     })
        // })

    },
    'change #chi2EdgeViewParam': function(e, template) {

        var net = template.view.parentView.parentView._templateInstance.network.get().net;
        //var valEdg = $(e.currentTarget).find('value').val();
        var valchiEdge = parseFloat(chi2EdgeViewParam.value);


        console.log("values", valchiEdge);
        var dataChi2Node1 = [];
        var dataChi2Node2 = [];
        console.log("dataChi2Node1", dataChi2Node1);

        net.edges().forEach(function(ele) {

            dataChi2Node1.push(parseFloat(ele.data().width));
            dataChi2Node2.push(parseFloat(ele.data().data2));
        })
        console.log("I'm in chi2")
        console.log(dataChi2Node1);
        console.log(dataChi2Node2);
        var unique1 = {};
        var distinct1 = [];
        dataChi2Node1.forEach(function(x) {
            if (!unique1[x]) {
                distinct1.push(x);
                unique1[x] = true;
            }
        });

        var unique2 = {};
        var distinct2 = [];
        dataChi2Node2.forEach(function(x) {
            if (!unique2[x]) {
                distinct2.push(x);
                unique2[x] = true;
            }
        });
        unique1 = unique1.sort;
        distinct1 = distinct1.sort;
        unique2 = unique2.sort;
        distinct2 = distinct2.sort;

        console.log("unique1", unique1);
        console.log("distinct1", distinct1);
        console.log("unique2", unique2);
        console.log("distinct2", distinct2);


























        // var averageEd = average(dataChi2Node1);
        // var standardDeviationEd = standardDeviation(dataChi2Node1);
        // console.log("averageEd", averageEd);
        // console.log("standardDeviationEd", standardDeviationEd);

        // //FOR INIT, NOT SURE IT IS NEEDED BUT HEY... IT WORKS
        // if (valEdg > 6) {
        //     valEdg = 1;
        //     console.log("sigma value set too high, so taking 1 instead")
        // }
        // net.edges().forEach(function(ele) {
        //     //FIXME:
        //     ele.data().count = ele.data().width
        //     var widthEd = ele.data().count;
        //     var zIndexEd = 10;
        //     //TODO: D3 SCALE

        //     if (widthEd <= (averageEd - ((valEdg + 4) * standardDeviationEd)) || widthEd >= (averageEd + ((valEdg + 4) * standardDeviationEd))) {
        //         color = '#FF1010'
        //         zIndexEd = 10
        //     } else if (widthEd <= (averageEd - ((valEdg + 3) * standardDeviationEd)) || widthEd >= (averageEd + ((valEdg + 3) * standardDeviationEd))) {
        //         color = '#EC5350'
        //         zIndexEd = 9
        //     } else if (widthEd <= (averageEd - ((valEdg + 2) * standardDeviationEd)) || widthEd >= (averageEd + (valEdg + 2) * standardDeviationEd)) {
        //         color = '#42A5F5'
        //         zIndexEd = 8
        //     } else if (widthEd <= (averageEd
        //      - ((valEdg + 1) * standardDeviationEd)) || widthEd >= (averageEd + (valEdg + 1) * standardDeviationEd)) {
        //         color = '#2BBBAD'
        //         zIndexEd = 7
        //     } else if (widthEd <= (averageEd - ((valEdg) * standardDeviationEd)) || widthEd >= (averageEd + (valEdg) * standardDeviationEd)) {
        //         color = '#20B0A0'
        //         zIndexEd = 5
        //     } else if (widthEd <= (averageEd + (valEdg * standardDeviationEd)) && widthEd >= (averageEd - (valEdg * standardDeviationEd))) {
        //         color = '#EEEEEE'
        //         zIndexEd = 4
        //     } else {
        //         console.log("FOR UNCLASSIFIEDS")
        //         console.log(widthEd);
        //         console.log("averageEd", averageEd);
        //         console.log("standardDeviationEd", standardDeviationEd);
        //         color = '#000000'
        //     }
        //     ele.style({
        //         'line-color': ele.data('starred') ? 'yellow' : color,
        //         'z-index': ele.data('starred') ? 10 : zIndexEd
        //     })
        // })

    }
}
