/* To read in the initial data below you need to setup a local server:
1. Turn off adblock
2. From the document library where the info is stored open the command line
3. Type: python -m http.server 8888
4. go to: http://lacalhost:8888/
5. choose file to open
*/

var parseDate = d3.timeParse("%m/%d/%Y");

d3.csv("prices.csv")
      .row(function(d){return {month: parseDate(d.month) , price:Number(d.price.trim().slice(1))}; })
      .get(function(error,data){

        //Declare chart height and width
        var height = 300;
        var width = 500;

        //Delcare scale parameters
        var max = d3.max(data, function(d){ return d.price; });
        var minDate = d3.min(data, function(d){ return d.month; });
        var maxDate = d3.max(data,function(d){ return d.month; });

        //setup x and y scales
        var y = d3.scaleLinear()     //This is saying take in the data from 0 to max and put it out from height to 0.
                  .domain([0, max])
                  .range([height,0]);

        var x = d3.scaleTime()    //This is saying take in the full date range and output it from 0 to the full width assigned
                  .domain([minDate, maxDate])
                  .range([0, width]);

        var yAxis = d3.axisLeft(y);
        var xAxis = d3.axisBottom(x);

        //Setup SVG and chart
        var svg = d3.select("body").append("svg").attr("height","100%").attr("width","100%");
        var margin = {left:50, right:50, top:40, bottom:0};

        var chartGroup = svg.append("g").attr("transform", "translate("+margin.left+","+margin.top+")");

        var line = d3.line()
                     .x(function(d){ return x(d.month); })
                     .y(function(d){return y(d.price); });

        chartGroup.append("path").attr("d",line(data));
        chartGroup.append("g").attr("class","x axis").attr("transform","translate(0,"+height+")").call(xAxis);
        chartGroup.append("g").attr("class","y axis").call(yAxis);


})
