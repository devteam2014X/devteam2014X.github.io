$(document).ready(function () {


            var data = jQuery.parseJSON(analysis1);

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
                    onclick: function(e) { openModal("chartmethodology", data[0][e.index+1]); },
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




            var data2 = jQuery.parseJSON(analysis2);

            c3.generate({
                bindto: '#chartpredictor',
                data: {
                    x: 'x',
                    y: "y",
                    columns: [
                        data2[0],
                        data2[1]
                    ],
                    type: 'bar',
                    onclick: function(e) { openModal("chartpredictor", data2[0][e.index+1]); },
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



            var data3 = jQuery.parseJSON(analysis3);

            c3.generate({
                bindto: '#chartdependent',
                data: {
                    x: 'x',
                    y: "y",
                    columns: [
                        data3[0],
                        data3[1]
                    ],
                    type: 'bar',
                    onclick: function(e) { openModal("chartdependent", data3[0][e.index+1]); },
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