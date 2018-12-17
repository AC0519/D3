var dataArray = [25,26,28,32,37,45,55,70,90,120,135,150,160,168,172,177,180];
var dataYears = ['2000','2001','2002','2003','2004','2005','2006','2007','2008','2009','2010','2011','2012','2013','2014','2015','2016'];

var parseDate = d3.timeParse("%Y");

var height = 200;
var width = 500;

var margin = {left:50, right:50, top:40, bottom:0};

var y = d3.scaleLinear()
            .domain([0,d3.max(dataArray)])
            .range([height,0]); // we invert this because of how d3 draws charts

var yAxis = d3.axisLeft(y).tickPadding(10).tickSize(10);//this tells d3 where to put the labels.  If I had wrote axisRight it would place them on the opposite side.
                                                        //you can add .ticks(#) after this and this will be the number of tick marks displayed
                                                        //more on tick settings can be found https://goo.gl/BFOcoe

var x = d3.scaleTime()
          .domain(d3.extent(dataYears, function(d){ return parseDate(d); }))//this does not need [] because extent returns an array of min and max
          .range([0, width]);

var xAxis = d3.axisBottom(x).tickPadding(10).tickSize(10);

var area = d3.area()
                .x(function(d,i){return x(parseDate(dataYears[i])); })
                .y0(height)
                .y1(function(d){ return y(d); });

var svg = d3.select("body").append("svg").attr("height","100%").attr("width","100%"); //Creates "canvas"to draw on
var chartGroup = svg.append("g").attr("transform","translate("+margin.left+","+margin.top+")"); //groups everything so we can have same margins and control
                                                                                               // everything within the same group simultaneously
chartGroup.append("path").attr("d", area(dataArray));//draws chart within the group
chartGroup.append("g")//adds axis to the group
      .attr("class","axis y")
      .call(yAxis);
chartGroup.append("g")//adds axis to the group
      .attr("class","axis x")
      .attr("transform","translate(0,"+height+")")
      .call(xAxis);
