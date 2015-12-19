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
        console.log("I'm in chi2 Node")
        console.log("dataChi2Node1", dataChi2Node1);
        console.log(dataChi2Node2);
        var uniqueNode1 = {};
        var distinctNode1 = [];
        dataChi2Node1.forEach(function(x) {
            if (!uniqueNode1[x]) {
                distinctNode1.push(x);
                uniqueNode1[x] = true;
            }
        });

        var uniqueNode2 = {};
        var distinctNode2 = [];
        dataChi2Node2.forEach(function(x) {
            if (!uniqueNode2[x]) {
                distinctNode2.push(x);
                uniqueNode2[x] = true;
            }
        });
        uniqueNode1 = uniqueNode1.sort();
        distinctNode1 = distinctNode1.sort();
        uniqueNode2 = uniqueNode2.sort();
        distinctNode2 = distinctNode2.sort();

        console.log("uniqueNode1", uniqueNode1);
        console.log("distinctNode1", distinctNode1);
        console.log("uniqueNode2", uniqueNode2);
        console.log("distinctNode2", distinctNode2);























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

        //INIT
        console.log("values", valchiEdge);
        var dataChi2Edge1 = [];
        var dataChi2Edge2 = [];
        console.log("dataChi2Edge1", dataChi2Edge1);

        net.edges().forEach(function(ele) {
            //PUSH DATAS
            dataChi2Edge1.push(parseFloat(ele.data().width));
            dataChi2Edge2.push(parseFloat(ele.data().data2));
        })
        console.log("I'm in chi2 Edge")
        console.log("dataChi2Edge1", dataChi2Edge1);
        console.log("dataChi2Edge2", dataChi2Edge2);
        //INIT COMPUTATION
        var uniqueEdge1 = {};
        var distinctEdge1 = [];
        //COUNT NUMBER OF ITEMS
        dataChi2Edge1.forEach(function(x) {
            if (!uniqueEdge1[x]) {
                distinctEdge1.push(x);
                uniqueEdge1[x] = 1;
            } else {
                //AND THEIR AMOUNT
                uniqueEdge1[x] = uniqueEdge1[x] + 1
            }
        });
        //COUNT NUMBER OF ITEMS #2
        var uniqueEdge2 = {};
        var distinctEdge2 = [];
        dataChi2Edge2.forEach(function(x) {
            if (!uniqueEdge2[x]) {
                distinctEdge2.push(x);
                uniqueEdge2[x] = 1;
            } else {
                //AND THEIR AMOUNT #2
                uniqueEdge2[x] = uniqueEdge2[x] + 1
            }
        });
        // uniqueEdge1 = uniqueEdge1.toArray().sort();
        distinctEdge1 = distinctEdge1.sort(sortNumber);
        // uniqueEdge2 = uniqueEdge2.toArray().sort();
        distinctEdge2 = distinctEdge2.sort(sortNumber);
        //FOR TESTS
        console.log("uniqueEdge1", uniqueEdge1);
        console.log("distinctEdge1", distinctEdge1);
        console.log("uniqueEdge2", uniqueEdge2);
        console.log("distinctEdge2", distinctEdge2);
        console.log("distinctEdge2.length", distinctEdge2.length);
        //INIT chi2matrix (2D array)
        var chi2EdgeMatrix = [];
        for (i = 0; i <= distinctEdge1.length; i++) {
            chi2EdgeMatrix[i] = new Array();
            for (j = 0; j <= distinctEdge2.length; j++) {
                chi2EdgeMatrix[i][j] = 0;
            }
        }
        console.log("chi2EdgeMatrix", chi2EdgeMatrix);
        // PUSH ROWS HEADERS(FOR REFERENCE)
        for (var i = 0; i < distinctEdge1.length; i++) {
            chi2EdgeMatrix[i + 1][0] = distinctEdge1[i];
        };
        // PUSH COLUMN HEADERS (FOR REFERENCE)
        for (var i = 0; i < distinctEdge2.length; i++) {
            chi2EdgeMatrix[0][i + 1] = distinctEdge2[i];
        };
        // FOR EACH EDGE, CHECK WHERE TO INCREMENT
        net.edges().forEach(function(ele) {
            //PUSH DATAS:
            //FIND ROW
            for (var i = 0; i < distinctEdge1.length; i++) {
                if (ele.data().width == chi2EdgeMatrix[i + 1][0]) {
            //FIND COLUMN
                    for (var j = 0; j < distinctEdge2.length; j++) {
                        if (ele.data().data2 == chi2EdgeMatrix[0][j + 1]) {
            //INCREMENT
                            chi2EdgeMatrix[i + 1][j + 1] = chi2EdgeMatrix[i + 1][j + 1] + 1;

                        }
                    }
                }
            }

        })
        console.log("chi2EdgeMatrix full", chi2EdgeMatrix);























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

function sortNumber(a, b) {
    return a - b;
}
