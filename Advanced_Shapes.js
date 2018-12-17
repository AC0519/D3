//great site to find generators: http://bl.ocks.org


/*
var dataArray = [{x:5,y:5},{x:10,y:15},{x:20,y:7},{x:30,y:18},{x:40,y:10}];

var svg = d3.select("body").append("svg").attr("height","100%").attr("width","100%");

//line generator function
var line = d3.line()
                .x(function(d){ return d.x*6; })
                .y(function(d){ return d.y*4; })
                .curve(d3.curveCardinal); //All curve intperpolations can be found: https://github.com/d3/d3/blob/master/API.md

//line generating code
svg.append("path")
      .attr("d", line(dataArray))
      .attr("fill","none")
      .attr("stroke","blue");

*/


/*
//Area chart

var dataArray = [25,26,28,32,37,45,55,70,90,120,135,150,160,168,172,177,180];
var dataYears = ['2000','2001','2002','2003','2004','2005','2006','2007','2008','2009','2010','2011','2012','2013','2014','2015','2016'];

var height = 200;
var width = 500;

//Area generator
var area = d3.area()
                .x(function(d,i){return i*20; })//each data point is 20px apart
                .y0(height)//distance from the top of the screen to the bottom of the y-axis (height of the chart)
                .y1(function(d){ return height-d; }); //represents the data point from bottom of the chart (active variable)

var svg = d3.select("body").append("svg").attr("height","100%").attr("width","100%");
svg.append("path").attr("d", area(dataArray));
*/


//Groups
var dataArray = [{x:5,y:5},{x:10,y:15},{x:20,y:7},{x:30,y:18},{x:40,y:10}];
var interpolateTypes = [d3.curveLinear, d3.curveNatural, d3.curveStep, d3.curveBasis, d3.curveBundle, d3.curveCardinal];

var svg = d3.select("body").append("svg").attr("height","100%").attr("width","100%");

for (var p=0; p<6; p++) {

        var line = d3.line()
                        .x(function(d){ return d.x*6; })
                        .y(function(d){ return d.y*4; })
                        .curve(interpolateTypes[p]);

        var shiftX = p*250;
        var shiftY = 0;
        var chartGroup = svg.append("g").attr("class","group"+p).attr("transform","translate("+shiftX+",0)"); //This allows us to shift everything by using translate to change x and y

        chartGroup.append("path")
              .attr("fill","none")
              .attr("stroke","blue")
              .attr("d", line(dataArray));

        chartGroup.selectAll("circle.grp"+p)
          .data(dataArray)
          .enter().append("circle")
                    .attr("class", function(d,i){ return "grp"+i; })
                    .attr("cx",function(d,i){ return d.x*6; })
                    .attr("cy",function(d,i){ return d.y*4; })
                    .attr("r","2");
}
