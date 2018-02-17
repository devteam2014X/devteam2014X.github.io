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


    $(document).on("click", ".sourceByCountry", function()
    {
        var country = $(this).attr("data-country");

        openModal("country", country);
    });

    $(document).on("click", ".tojournalsrow", function () {
        var journal = $(this).attr("data-id");
        openModal("chartpuborgan", journal);
    });


    var paperdata = JSON.parse(paper2);

    c3.generate({
        bindto: '#chartpuborgan',
        data: {
            x: 'x',
            y: "y",
            columns: [
                paperdata[0],
                paperdata[1]
            ],
            type: 'bar',
            onclick: function(e) { openModal("chartpuborgan", paperdata[0][e.index+1]); },
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


    $(document).on("click", ".mostcitatedsourcesrow", function () {

        var id = $(this).attr("data-id");

        $(".sourceModalBody").load("sources/source"+id+".html", "", function()
        {
            $(".amountofsources").html(1);
            $(".modalback").hide();
            $("#sourceModal").modal("show");

        });



    });


    data = jQuery.parseJSON(datatype4);

    var basic = new Datamap({
        element: document.getElementById("chartcountry"),
        responsive: true,
        done: function(datamap) {
            datamap.svg.selectAll('.datamaps-subunit').on('click', function (geography) {
                openModal("country", geography.id);
            });
        },
        fills: {
            defaultFill: "#DBDAD6",
            active: "#2BA587"
        },
        geographyConfig: {
            highlightFillColor: '#F59B00',
            popupTemplate: function(geography, data) {
                return '<div class="hoverinfo sourceByCountry" data-country="'+geography.properties.name+'">' + geography.properties.name + '</br>Sources:' +  data.sources + '</div>'
            },
            highlightBorderWidth: 0
        }

    });

    var basiccountries = Datamap.prototype.worldTopo.objects.world.geometries;
    var countriesForMap = [];
    for (var i = 0, j = basiccountries.length; i < j; i++) {
        countriesForMap[basiccountries[i].id] = basiccountries[i].properties.name;
    }

    var countries = {};

    for (var key in countriesForMap) {
        var value = countriesForMap[key];

        if(data[key] != null)
        {
            if(data[key][1] > 0)
            {
                countries[key] = { fillKey: data[key][0], "sources": data[key][1] };
            }
            else
            {
                countries[key] = { fillKey: "defaultFill","sources": data[key][1] };
            }

        }

    }

    basic.updateChoropleth(countries);

    $(window).on('resize', function() {
        setTimeout(function(){
            basic.resize();
        },100)
    });




});

