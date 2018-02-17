$(document).ready(function () {

    $(document).on("click", ".overview", function () {
        window.location.href = "/overview.php";
    });

    var charttype = "";
    var key = "";

    $(document).on("click", ".filteredsourcerow", function () {

        var id = $(this).attr("data-id");
        key = $("#key").val();
        charttype = $("#charttype").val();

        var elem = $(this);

        // $(".sourceModalBody").load("sources/source" + id + ".html", "", function () {
            // if (elem.attr("data-key") != null && elem.attr("data-key") == "hide") {
                // $(".modalback").hide();
            // }
        // });
		
		var xhr= new XMLHttpRequest();
		xhr.open('GET', "sources/source" + id + ".html", true);
		xhr.onreadystatechange= function() {
		if (this.readyState!==4) return;
		if (this.status!==200) return; // or whatever error handling you want
		$(".sourceModalBody").html(this.responseText);
		
		 if (elem.attr("data-key") != null && elem.attr("data-key") == "hide") {
                $(".modalback").hide();
            }
		
		};
		xhr.send();


    });


    $(document).on("click", ".modalback", function () {
        openModal(charttype, key);
    });


});


function openModal(chart, key) {


    var data = jQuery.parseJSON(sources);
    var finalSources = [];

    switch (chart) {
        case "chartpubyear":
            data.forEach(function (obj) {
                if (obj["publication"] == key) {
                    finalSources.push(obj);
                }
            });
            break;
        case "chartpuborgan":
            data.forEach(function (obj) {
                if (obj["publicationorgan"] == key) {
                    finalSources.push(obj);
                }
            });
            break;
        case "chartyearofdc":
            data.forEach(function (obj) {
                if (obj["yearofdatacollection"] == key) {
                    finalSources.push(obj);
                }
            });
            break;
        case "chartdatatype":
            data.forEach(function (obj) {
                obj["datatype"].forEach(function (elem) {
                    var inserted = false;
                    if (elem == key && inserted == false) {
                        finalSources.push(obj);
                        inserted = true;
                    }
                })
            });
            break;
        case "chartresearchcontext":
            data.forEach(function (obj) {
                obj["researchcontext"].forEach(function (elem) {
                    var inserted = false;
                    if (elem == key && inserted == false) {
                        finalSources.push(obj);
                        inserted = true;
                    }
                })
            });
            break;
        case "country":
            data.forEach(function (obj) {
                obj["countries"].forEach(function (elem) {
                    var inserted = false;
                    if (elem == key && inserted == false) {
                        finalSources.push(obj);
                        inserted = true;
                    }
                })
            });
            break;
        case "chartmethodology":
            data.forEach(function (obj) {
                obj["methodology"].forEach(function (elem) {
                    var inserted = false;
                    if (elem == key && inserted == false) {
                        finalSources.push(obj);
                        inserted = true;
                    }
                })
            });
            break;
        case "chartvariables":
            data.forEach(function (obj) {
                obj["variables"].forEach(function (elem) {

                    var inserted = false;
                    if (elem[0].indexOf(key) !== -1 && inserted == false) {
                        if (finalSources.indexOf(obj) == -1) {
                            finalSources.push(obj);
                        }
                        inserted = true;
                    }

                })
            });
            break;
        case "chartdependent":
            data.forEach(function (obj) {
                obj["variables"].forEach(function (elem) {
                    if (elem[1] == 2) {
                        var inserted = false;
                        if (elem[0] == key && inserted == false) {
                            finalSources.push(obj);
                            inserted = true;
                        }
                    }
                })
            });
            break;

    }

    var finalSourcesOutput = "";
    var counter = 0;
    finalSources.forEach(function (elem) {

        var methodology = "";
        elem["methodology"].forEach(function(data){
            methodology +=  data+"; ";
        });
        methodology = methodology.substring(0, methodology.length -2);

        var researchcontext = "";
        elem["researchcontext"].forEach(function(data){
            researchcontext +=  data+"; ";
        });
        researchcontext = researchcontext.substring(0, researchcontext.length -2);

        var datatype = "";
        elem["datatype"].forEach(function(data){
            datatype +=  data+"; ";
        });
        datatype = datatype.substring(0, datatype.length -2);

        var predictors = [];
        var dependents = [];
        elem["variables"].forEach(function (data)
        {
            if(data[1] == 1)
            {
                var tmparray = [];

                if(data[0].indexOf(":") !== -1)
                {
                    var key = data[0].substring(0,data[0].indexOf(":"));
                    var name = data[0].substring(data[0].indexOf(":")+1).trim();

                    var alreadyInserted = false;
                    predictors.forEach(function (dataarr){
                        if(dataarr[0] == key)
                        {
                            dataarr.push(name);
                            alreadyInserted = true;
                        }
                    });

                    if(alreadyInserted == false)
                    {
                        tmparray.push(key);
                        tmparray.push(name);
                        predictors.push(tmparray);
                    }
                }
                else
                {
                    tmparray.push(data[0]);
                    predictors.push(tmparray);
                }
            }
            else
            {
                var tmparray = [];

                if(data[0].indexOf(":") !== -1)
                {
                    var key = data[0].substring(0,data[0].indexOf(":"));
                    var name = data[0].substring(data[0].indexOf(":")+1).trim();

                    var alreadyInserted = false;
                    dependents.forEach(function (dataarr){
                        if(dataarr[0] == key)
                        {
                            dataarr.push(name);
                            alreadyInserted = true;
                        }
                    });

                    if(alreadyInserted == false)
                    {
                        tmparray.push(key);
                        tmparray.push(name);
                        dependents.push(tmparray);
                    }
                }
                else
                {
                    tmparray.push(data[0]);
                    dependents.push(tmparray);
                }
            }
        });

        var predictortext = "";
        predictors.forEach(function (data){

            if(data.length > 1)
            {
                predictortext += '<p><span class="badge badge-primary">'+data[0]+": ";
                data[0] = "";

                data.forEach(function (dataelem){
                    if(dataelem != "")
                    {
                        predictortext += dataelem + "; ";
                    }

                });

                predictortext = predictortext.substring(0, predictortext.length -2);

                predictortext += "</span></p>";
            }
            else
            {
                predictortext += '<p><span class="badge badge-primary">'+data[0]+"</span></p>";
            }
        });


        var dependentstext = "";
        dependents.forEach(function (data){

            if(data.length > 1)
            {
                dependentstext += '<p><span class="badge badge-primary">'+data[0]+": ";
                data[0] = "";

                data.forEach(function (dataelem){
                    if(dataelem != "")
                    {
                        dependentstext += dataelem + "; ";
                    }

                });

                dependentstext = dependentstext.substring(0, dependentstext.length -2);

                dependentstext += "</span></p>";
            }
            else
            {
                dependentstext += '<p><span class="badge badge-primary">'+data[0]+"</span></p>";
            }
        });
		
		if(elem["yearofdatacollection"] == "" || elem["yearofdatacollection"] == "0000")
		{
			elem["yearofdatacollection"] = "Not provided";
		}


        finalSourcesOutput += "<tr class='clickable filteredsourcerow' data-id='" + elem["id"] + "'>" +
        "<td>" + predictortext + "</td>" +
        "<td>" + dependentstext + "</td>" +
        "<td>" + elem["theoreticalbackground"] + "</td>" +
        "<td>" + methodology + "</td>" +
        "<td>" + researchcontext + "</td>" +
        "<td>" + elem["yearofdatacollection"] + "</td>" +
        "<td>" + datatype + "</td>" +
        "<td style='text-align: right'>" + elem["referencesid"] + "</td>" +
        "</tr>";
        counter++;
    });

    var output = "<input type='hidden' id='charttype' value='" + chart + "'>" +
        "<input type='hidden' id='key' value='" + key + "'>" +
        "<table class='table table-striped table-hover' style='text-align: center'>" +
        "      <thead> " +
        "          <tr>" +
        "              <th class='textcenter'>Research Focus</th>" +
        "              <th class='textcenter'>Analysis Focus</th>" +
        "              <th class='textcenter'>Theoretical Background</th>" +
        "              <th class='textcenter'>Methodology</th>" +
        "              <th class='textcenter'>Search Engine Examined</th>" +
        "              <th class='textcenter'>Year of Data Collection</th>" +
        "              <th class='textcenter'>Type of Study</th>" +
        "              <th style='text-align: right'>Source</th>" +
        "           </tr>" +
        "        </thead>" +
        "    <tbody>" +
        finalSourcesOutput +
        "    </tbody>" +
        "</table>";


    $(".amountofsources").html(counter);
    $(".sourceModalBody").html(output);
    $("#sourceModal").modal("show");


}

