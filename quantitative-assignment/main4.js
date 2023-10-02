//Works of Wildlife 
//Olivia Ramos - MSDV Major Studio 1_Fall 2023

// set the dimensions and margins
const margin = {top: 80, right: 20, bottom: 50, left: 120};
const width = window.innerWidth-200;
const height = window.innerHeight-200;

// create an svg object and append it into the body
const svg = d3.select("#graph")
    .append("svg")
    .attr("width", width+margin.left+margin.right)
    .attr("height", height+margin.top+margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top*.50 +")");

// load the data, parse it, and make sure quantites are numbers
d3.csv("/wow_chartdata.csv", function(d, i, columns) {
    for (i = 1, n = 0; i < columns.length; ++i) n += d[columns[i]] = +d[columns[i]];
    d.total = n;
    return d;
    animal_Class: d.animal_Classification;
    Decorative_Art: +d.Decorative_Art;
    Drawing: +d.Drawing;
    Ephemera_NonNGA: +d.Ephemera_NonNGA;
    Index_of_American_Design: +d.Index_of_American_Design;
    Painting: +d.Painting;
    Photograph: +d.Photograph;
    Portfolio: +d.Portfolio;
    Sculpture: +d.Sculpture;
    Volume: +d.Volume
}).then(function(data){
console.log(data);


// create keys that correspond to art classification. these represent categories for each bar
const typeKeys = data.columns.slice(1);
console.log(typeKeys);

// stack the data into bars
const stack = d3.stack()
   .keys(typeKeys)
   .order(d3.stackOrderNone)
   .offset(d3.stackOffsetNone)
const stackedData =stack(data)
console.log(stackedData);

// sort data so longest bar is on the top and rest follow in descending order
data.sort((a, b) => b.total - a.total);

// format the x-scale and x-axis
const xScale = d3.scaleLinear()
  .domain([0, 900])
  .range([0, width])
svg.append('g')
  .attr("transform", `translate(0, ${height})`)
  .call(d3.axisBottom(xScale).ticks(7).tickSize(0).tickPadding(6))
  .call(d => d.select(".domain").remove());

// format the y-scale and y-axis
const yScale = d3.scaleBand()
  .domain(data.map(d => d.animal_Classification))
  .range([0, height])
  .padding(.2);
svg.append('g')
  .call(d3.axisLeft(yScale).tickSize(0).tickPadding(6));

// create vertical grid lines
const GridLine = function() {return d3.axisBottom().scale(xScale)};
svg.append("g")
  .attr("class", "grid")
  .call(GridLine()
  .tickSize(height,0,0)
  .tickFormat("")
  .ticks(16)
);

//make titles for both x-axis and y-axis
//can't get y axis label into right placement!
svg.append("text")
    .attr("class", "x-label")
    .attr("x", width/2)
    .attr("y", height+margin.bottom/1)
    .attr("text-anchor", "middle")
    .text("Number of Artworks")
//  svg.append("text")
//     .attr("class", "y-label")
//     .attr("x", width/+margin.left/30)
//     .attr("y", height/10)
//     .attr("text-anchor", "middle")
//     .text("Class of Animal")


// make tooltip feature that will show data when you hover over sections of each bar
    const tooltip = d3.select("#tooltip")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radius", "5px")
    .style("padding", "5px")
    .style("position", "absolute")

// events for tooltip
const mouseover = function(d) {
    tooltip
      .style("opacity", .8)
      d3.select(this)
      .style("opacity", .5)
}
const mousemove = function(event, d) {
var subgroupName = d3.select(this.parentNode).datum().key;
var subgroupValue = d.data[subgroupName];
console.log(subgroupValue);
    tooltip
      .html("Art Type: " + subgroupName + "<br>" + "Quanity in Collection: " + subgroupValue)
      .style("left", (event.pageX) + "px")
      .style("top", (event.pageY) + "px")
    //   .style("left", (d3.select(this)) + "px")
    //   .style("top", (d3.select(this)) + "px")
}
const mouseleave = function(d) {
    tooltip
      .style("opacity", 0)
    d3.select(this)
      .style("opacity", 1)
}

// set colors for each subsection of the bars
const color = d3.scaleOrdinal()
  .domain(typeKeys)
  .range(["#8686C6", "#80C1E6", "#FFCF00", "#9B3B3B", "#FDEAD5", "#FF7F7F", "#B95F62", "#621015","#201F49","#00B2A9"])

// create the bars
svg.append("g")
  .selectAll("g")
  .data(stackedData)
  .join("g")
  .attr("fill", d => color(d.key))
  .selectAll("rect")
  .data(d => d)
  .join("rect")
  .attr("x", d => xScale(d[0]))
  .attr("y", d => yScale(d.data.animal_Classification))
  .attr("width",  d => xScale(d[1])-xScale(d[0]))
  .attr("height", yScale.bandwidth())
  .on("mouseover", mouseover)
  .on("mousemove", mousemove)
  .on("mouseleave", mouseleave)


// source tag for data 
svg.append("text")
    .attr("x", width-(margin.right)*6)
    .attr("y", height + margin.bottom/1)
    .attr("class", "source")
    .text("Data Source: National Gallery of Art")


// //create a legend with every artwork type -->
//deleting for now and inserting svg image. how to position text and rectangle so scale with screen size changes?

// title of legend
// svg.append("text")
//   .attr("class", "chart-title")
//   .attr("x", -(margin.left)*0.8)
//   .attr("y", -(margin.top)/1.5)
//   .attr("text-anchor", "start")
//   .text("Type of Artwork")
// svg.append("circle")
//   .attr('r', 13)
//   .attr("cx", 0)
//   .attr("cy", -(margin.top/2))
//   .style("fill", "#8686C6")
// svg.append("text")
//    .attr("class", "legend")
//    .attr("x", 20)
//    .attr("y", -(margin.top/2.7))
//    .text("Decorative Art")
//  svg.append("circle")
//    .attr('r', 13)
//    .attr("cx", 110)
//    .attr("cy", -(margin.top/2))
//    .style("fill", "#80C1E6")
// svg.append("text")
//    .attr("class", "legend")
//    .attr("x", 130)
//    .attr("y", -(margin.top/2.7))
//    .text("Drawing")
// svg.append("circle")
//    .attr('r', 13)
//    .attr("cx", 220)
//    .attr("cy", -(margin.top/2))
//    .style("fill", "#FFCF00")
// svg.append("text")
//    .attr("class", "legend")
//    .attr("x", 240)
//    .attr("y", -(margin.top/2.7))
//    .text("Ephemera")
// svg.append("circle")
//    .attr('r', 13)
//    .attr("cx", 330)
//    .attr("cy", -(margin.top/2))
//    .style("fill", "#9B3B3B")
// svg.append("text")
//    .attr("class", "legend")
//    .attr("x", 350)
//    .attr("y", -(margin.top/2.7))
//    .text("Index of American Design")
// svg.append("circle")
//    .attr('r', 13)
//    .attr("cx", 440)
//    .attr("cy", -(margin.top/2))
//    .style("fill", "#FDEAD5")
// svg.append("text")
//    .attr("class", "legend")
//    .attr("x", 460)
//    .attr("y", -(margin.top/2.7))
//     .text("Painting")
// svg.append("circle")
//    .attr('r', 13)
//    .attr("cx", 550)
//    .attr("cy", -(margin.top/2))
//    .style("fill", "#FF7F7F")
// svg.append("text")
//    .attr("class", "legend")
//    .attr("x", 570)
//    .attr("y", -(margin.top/2.7))
//    .text("Photograph")
// svg.append("circle")
//    .attr('r', 13)
//    .attr("cx", 660)
//    .attr("cy", -(margin.top/2))
//    .style("fill", "#B95F62")
// svg.append("text")
//    .attr("class", "legend")
//    .attr("x", 680)
//    .attr("y", -(margin.top/2.7))
//    .text("Portfolio")
// svg.append("circle")
//    .attr('r', 13)
//    .attr("cx", 770)
//    .attr("cy", -(margin.top/2))
//    .style("fill", "#621015")
// svg.append("text")
//     .attr("class", "legend")
//      .attr("x", 790)
//      .attr("y", -(margin.top/2.7))
//     .text("Print")
// svg.append("circle")
//    .attr('r', 13)
//    .attr("cx", 880)
//    .attr("cy", -(margin.top/2))
//    .style("fill", "#201F49")
// svg.append("text")
//    .attr("class", "legend")
//    .attr("x", 900)
//    .attr("y", -(margin.top/2.7))
//    .text("Sculpture")
// svg.append("circle")
//    .attr('r', 13)
//    .attr("cx", 990)
//    .attr("cy", -(margin.top/2))
//    .style("fill", "#00B2A9")
// svg.append("text")
//    .attr("class", "legend")
//    .attr("x", 1010)
//    .attr("y", -(margin.top/2.7))
//    .text("Volume")

})
