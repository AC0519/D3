var dataArray = [5,11,18];
var dataDays = ["Mon","Wed","Fri"];

var rainbow = d3.scaleSequential(d3.interpolateRainbow).domain([0,3]); //d3 divides the color sequence by the second number of the domain
var cat20 = d3.schemeCategory20; //fill by predefined color hexcode array

var x = d3.scaleBand()
            .domain(dataDays)
            .range([0,170])
            .paddingInner(0.1176); //each bar is 50px wide with two gaps of 10px each.  20/170 = 11.76% white space

var xAxis = d3.axisBottom(x);

//setting up svg (blank canvas) in body of html
var svg = d3.select("body").append("svg").attr("height","100%").attr("width","100%");

//add some rectangles to svg
svg.selectAll("rect")
      .data(dataArray)
      .enter().append("rect")
                .attr("height",function(d,i){ return d*15; })//returning data point based on value multiplied by 15
                .attr("width","50")
                .attr("fill",function(d,i){ return rainbow(i); })
                .attr("x",function(d,i){ return 60 * i; }) //returning x value based on position in index with a space of 10px between bars (60-width of 50)
                .attr("y",function(d,i){ return 300 - (d*15); }); //the y coordinte positions the top most of the rectangle vertically,
                                                                  //with 0 starting at the top left of the browser.  Therefore we have to
                                                                  //invert this by selecting 300 as our new x-axis and subtracting the height
                                                                  //to make the bottom of the rectangle the new base.

svg.append("g")  //Add x scale to bar graph
      .attr("class","x axis hidden")
      .attr("transform","translate(0,300)")
      .call(xAxis);


//creating cirlces
var newX = 300; //We are setting 300 to take us to the right of the bar chart
svg.selectAll("cirlce.first")
      .data(dataArray)
      .enter().append("circle")
                .attr("class","first")
                .attr("fill",function(d,i){ return cat20[i]; })//use [] after cat20 because this is tapping an array
                .attr("cx",function(d,i){ newX+= (d*3) + (i*20); return newX;}) //d is multiplied by 6 because this is our diameter
                .attr("cy","100")
                .attr("r",function(d){ return d*3;});


//creating an ellipse

var newX = 600; //We are setting 300 to take us to the right of the bar chart
svg.selectAll("ellipse")
      .data(dataArray)
      .enter().append("ellipse")
                .attr("class","second")
                .attr("cx",function(d,i){ newX+= (d*3) + (i*20); return newX;}) //d is multiplied by 6 because this is our diameter
                .attr("cy","100")
                .attr("rx",function(d){ return d*3;})
                .attr("ry","30");


//drawing lines
var newX = 900; //We are setting 300 to take us to the right of the bar chart
svg.selectAll("line")
      .data(dataArray)
      .enter().append("line")
                .attr("x1",newX)
                .attr("y1",function(d,i){ return 80 + (i*20); }) //The Y values will depend on index because we don't want the lines on top of each other
                .attr("x2",function(d){ return newX+(d*15); }) //the line will start at newx and end at 15 times its data value
                .attr("y2",function(d,i){ return 80 + (i*20); })
                //.attr("stroke","blue")  //you can also do this same thing using .style or altering the CSS sheet. .sytle takes precedence
                                       // over everything when there is conflict between style, stroke, and CSS, followed by CSS and then .attr("stroke"...
                .attr("stroke-width","2");


//Add text
var textArray = ["Start","Middle","End"];

svg.append("text").selectAll("tspan")
    .data(textArray)
    .enter().append("tspan")
      .attr("x",newX)
      .attr("y",function(d,i){ return 150 + (i*30); })
      .attr("fill","none")
      .attr("stroke","blue")
      .attr("stroke-width","2")
      .attr("text-anchor","start") //changes horizontal alignment
      .attr("dominant-baseline","middle") //changes vertical alignment (dominant-baseline has a lot of options that can be seen at: http://goo.gl/NON8kj)
      .attr("font-size","30")
      .text(function(d){ return d; });

svg.append("line")
    .attr("x1",newX)
    .attr("y1","150")
    .attr("x2",newX)
    .attr("y2","210");
