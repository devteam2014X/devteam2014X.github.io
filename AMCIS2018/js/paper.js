$(document).ready(function () {

    var data = jQuery.parseJSON(paper1);

    c3.generate({
        bindto: '#chartpubyear',
        data: {
            x: 'x',
            y: "y",
            columns: [
                data[0],
                data[1]
            ],
            onclick: function(e) { openModal("chartpubyear", e.x); },
            selection: {
                enabled: true
            }
        },
        axis : {
            x : {
                label: { // ADD
                    text: 'Years',
                    position: 'outer-middle'
                }
            },
            y : {
                tick: {
                    format: function(x) {
                        return (x == Math.floor(x)) ? x : "";
                    }
                }
            }
        }
    });



    var data2 = JSON.parse(paper2);

    c3.generate({
        bindto: '#chartpuborgan',
        data: {
            x: 'x',
            y: "y",
            columns: [
                data2[0],
                data2[1]
            ],
            type: 'bar',
            onclick: function(e) { openModal("chartpuborgan", data2[0][e.index+1]); },
            selection: {
                enabled: true
            }
        },
        axis: {
            x: {
                type: 'category',
                tick: {
                    multiline: false
                },
                height: 40
            },
            y : {
                tick: {
                    format: function(x) {
                        return (x == Math.floor(x)) ? x : "";
                    }
                }
            }

        },
        bar: {
            width: {
                ratio: 0.5
            }
        }
    });



});