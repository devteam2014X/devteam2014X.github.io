$(document).ready(function () {


    var data2 = jQuery.parseJSON(datatype2);

    var percentage = 0;
    data2[1].forEach(function (elem)
    {
        if(elem > 0)
        {
            percentage = percentage*1 + elem*1;
        }
    });

    c3.generate({
        bindto: '#chartdatatype',
        data: {
            x: 'x',
            y: "y",
            columns: [
                data2[0],
                data2[1]
            ],
            type: 'bar',
            onclick: function (e) {
                openModal("chartdatatype", data2[0][e.index + 1]);
            },
            selection: {
                enabled: true
            },
            labels: {
                format: function (v, id, i, j) {
                    return round_number(v/percentage * 100, 1) + "%";
                }
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
            y: {
                tick: {
                    format: function (x) {
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


    var data3 = jQuery.parseJSON(datatype3);

    var percentage = 0;
    data3[1].forEach(function (elem)
    {
        if(elem > 0)
        {
            percentage = percentage*1 + elem*1;
        }
    });

    c3.generate({
        bindto: '#chartresearchcontext',
        data: {
            x: 'x',
            y: "y",
            columns: [
                data3[0],
                data3[1]
            ],
            type: 'bar',
            onclick: function (e) {
                openModal("chartresearchcontext", data3[0][e.index + 1]);
            },
            selection: {
                enabled: true
            },
            labels: {
                format: function (v, id, i, j) {
                    return round_number(v/percentage * 100, 1) + "%";
                }
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
            y: {
                tick: {
                    format: function (x) {
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


    var data = jQuery.parseJSON(analysis1);

    var percentage = 0;
    data[1].forEach(function (elem)
    {
        if(elem > 0)
        {
            percentage = percentage*1 + elem*1;
        }
    });

    c3.generate({
        bindto: '#chartmethodology',
        data: {
            x: 'x',
            y: "y",
            columns: [
                data[0],
                data[1]
            ],
            type: 'bar',
            onclick: function (e) {
                openModal("chartmethodology", data[0][e.index + 1]);
            },
            selection: {
                enabled: true
            },
            labels: {
                format: function (v, id, i, j) {
                    return round_number(v/percentage * 100, 1) + "%";
                }
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
            y: {
                tick: {
                    format: function (x) {
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


    var data5 = jQuery.parseJSON(analysis2);

    var percentage = 0;
    data5[1].forEach(function (elem)
    {
        if(elem > 0)
        {
            percentage = percentage*1 + elem*1;
        }
    });

    c3.generate({
        bindto: '#chartvariables',
        data: {
            x: 'x',
            y: "y",
            columns: [
                data5[0],
                data5[1]
            ],
            type: 'bar',
            onclick: function (e) {
                openModal("chartvariables", data5[0][e.index + 1]);
            },
            selection: {
                enabled: true
            },
            labels: {
                format: function (v, id, i, j) {
                    return round_number(v/percentage * 100, 1) + "%";
                }
            }
        },
        axis: {
            x: {
                type: 'category',
                tick: {
                    multiline: false
                }
            },
            y: {
                tick: {
                    format: function (x) {
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


function round_number(num, dec) {
    return Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
}