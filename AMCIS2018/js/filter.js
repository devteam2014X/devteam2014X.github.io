$(document).ready(function () {



    var date = new Date(Date.now());

    var datenow = date.getFullYear();

    $('.chosen-select').chosen({width: "100%"});

    $("#yearofpublicationslider").ionRangeSlider({
        min: 1980,
        max: datenow,
        type: 'double',
        prefix: "Year: ",
        grid: true,
        force_edges: true
    });

    $("#numberofreferences").ionRangeSlider({
        min: 0,
        max: 100,
        type: 'double',
        max_postfix: "+",
        grid: true,
        force_edges: true
    });

    $("#numberofcitations").ionRangeSlider({
        min: 0,
        max: 100,
        type: 'double',
        max_postfix: "+",
        grid: true,
        force_edges: true
    });


    $('.i-checks').iCheck({
        checkboxClass: 'icheckbox_square-green',
        radioClass: 'iradio_square-green'
    });


    $("#yearofdatacollectionslider").ionRangeSlider({
        min: 1980,
        max: datenow,
        type: 'double',
        prefix: "Year: ",
        prettify: false,
        hasGrid: true,
        force_edges: true,
        grid_num: 10
    });




    $(document).on("click", ".submitFilter", function(){

        var data = jQuery.parseJSON(sources);
        var finalSources = [];

        var slideryearofpub = $("#yearofpublicationslider").data("ionRangeSlider");
        var fromyearofpub = slideryearofpub.result.from;
        var toyearofpub = slideryearofpub.result.to;



        var datatypes = [];
        $(".datatypecheckbox").each(function(){
            if($(this).prop("checked"))
            {
                datatypes.push($(this).val());
            }
        });

        var researchcontexts = [];
        $(".researchcontextcheckbox").each(function(){
            if($(this).prop("checked"))
            {
                researchcontexts.push($(this).val());
            }
        });


        var predictor = [];
        $(".variablecheckbox").each(function(){
            if($(this).prop("checked"))
            {
                if($(this).attr("data-variable") == 1)
                {
                    predictor.push($(this).val());
                }
            }
        });

        var dependent = [];
        $(".variablecheckbox").each(function(){
            if($(this).prop("checked"))
            {
                if($(this).attr("data-variable") == 2)
                {
                    dependent.push($(this).val());
                }
            }
        });


        data.forEach(function (elem)
        {

            console.log(predictor);

            if(elem["publication"] >= fromyearofpub && elem["publication"] <= toyearofpub)
            {
                var isIn = true;

                researchcontexts.forEach(function (attr)
                {
                    if(elem["researchcontext"].indexOf(attr) < 0)
                    {
                        isIn = false;
                    }
                });

                datatypes.forEach(function (attr)
                {
                    if(elem["datatype"].indexOf(attr) < 0)
                    {
                        isIn = false;
                    }
                });

                var predictors = [];
                var dependents = [];
                elem["variables"].forEach(function (variable)
                {
                    if(variable[1] == 1)
                    {
                        predictors.push(variable[0]);
                    }
                    else
                    {
                        dependents.push(variable[0]);
                    }
                });

                predictor.forEach(function (attr)
                {
                    if(predictors.indexOf(attr) < 0)
                    {
                        isIn = false;
                    }
                });


                dependent.forEach(function (attr)
                {
                    if(dependents.indexOf(attr) < 0)
                    {
                        isIn = false;
                    }
                });


                if(isIn)
                {
                    finalSources.push(elem);
                }

            }

        });

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


            finalSourcesOutput += "<tr class='clickable filteredsourcerow' data-key='hide' data-id='" + elem["id"] + "'>" +
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

        var output = "<table class='table table-striped table-hover' style='text-align: center'>" +
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


        $(".sourceModalBody").html(output);
        $(".amountofsources").html(counter);

        $("#sourceModal").modal("show");



    });







});

