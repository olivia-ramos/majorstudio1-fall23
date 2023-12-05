


// var wheelLabel1 = [
//   {"label":"bird",  "value":1,  "question":"bird"}, // padding
//   {"label":"mammal",  "value":2,  "question":"mammal"}, //font-family
//   {"label":"fish",  "value":3,  "question":"fish"}, //color
//   {"label":"amphibian",  "value":4,  "question":"amphibian"}, //font-weight
//   {"label":"fantasy",  "value":5,  "question":"fantasy"}, //font-size
//   {"label":"insect",  "value":6,  "question":"insect"}, //background-color
//   {"label":"reptile",  "value":7,  "question":"reptile"}, //nesting
// ];

const wheel1 = {bird: 1, mammal: 1, fish: 1, amphibian: 1, fantasy: 1, insect: 1, reptile: 1};

////define all subgroups
  //mammals
  const feliforms = {cat:1, jaguar:1, leopard:1, lion:1, lynx1:1, ocelot:1, panther:1, tiger:1};
  const caniforms = ["bear", "coyote", "dog", "fox", "wolf" ];
  const primates = ["monkey", "ape"];
  const ungulates = ["antelope", "bison", "camel", "cow", "deer", "dolphin", "donkey", "elk", "gazelle", "goat", "horse", "ox", "pig", "rhino", "sheep", "whale"];
  const glires = ["hare", "rabbit", "mouse", "squirrel"];
  const xenarthra = ["anteater", "armadillo",];
  const proboscidea = ["elephant"];

  //birds

  //fish

  //amphibians

  //fantasy

  //insects

  //reptiles


////create objects grouping subgroups by animal class
const mammalSub = {caniforms:1, feliforms:1,primates:1,ungulates:1, glires:1, xenarthra:1, proboscidea:1};
const birdSub = {}
const fishSub = {}
const amphibianSub = {}
const fantasySub= {}
const insectSub= {}
const reptileSub= {}



// var padding = {top:20, right:40, bottom:0, left:0},
//             w = 500 - padding.left - padding.right,
//             h = 500 - padding.top  - padding.bottom,
//             r = Math.min(w, h)/2,
//             rotation = 0,
//             oldrotation = 0,
//             picked = 100000,
//             oldpick = [];

var svg = d3.select(".wheel") // this is a D3 selection
            .append("svg")
            .attr("width", 1900)
            .attr("height", 1080)
            .style('background-color','black')

			width = svg.attr("width"),
			height = svg.attr("height"),
			radius_wheel1 = 100
      radius_wheel2 = 200
      radius_wheel3 = 300


const circle3 = svg.append('circle')
                    .attr('r', 300)
                    .attr('cx', 850)
                    .attr('cy', 540)
                    .attr('fill', "#EA00CA");

const circle2 = svg.append('circle')
                    .attr('r', 200)
                    .attr('cx', 850)
                    .attr('cy', 540)
                  .attr('fill', "#1E99F9");

// const circle1 = svg.append('circle')
//                    .attr('r', 100)
//                    .attr('cx', 850)
//                    .attr('cy', 540)
//                    .attr('fill', "#FFAE00")
//                   .append("path")


////// Wheel 3 //////
g3 = svg.append("g")
.attr("transform", "translate(" + 850 + "," + 540 + ")")
.attr("id", "wheel3")
document.getElementById("wheel3").style.display = "none";


// Generate the pie
var w3pie = d3.pie();

// Generate the arcs
var w3arc = d3.arc()
      .innerRadius(0)
      .outerRadius(radius_wheel3);

//Generate groups
var w3arcs = g3.selectAll("arc")
      .data(w3pie(Object.values(mammalSub)))
      .enter()
      .append("g")
      .attr("class", "arc")
     
//Draw arc paths
w3arcs.append("path")
  .attr("fill", "#EA00CA")
  .attr("d", w3arc);

//add text labels
w3arcs.append("text").attr("transform", function(d){
    d.innerRadius = 0;
    d.outerRadius = radius_wheel3;
    d.angle = (d.startAngle + d.endAngle)/2;
    return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")translate(" + (d.outerRadius -10) +")";
})
.attr("text-anchor", "end")
.style("font-size", 18)
.text( function(d, i) {
  return Object.keys(mammalSub)[i];
});



////// Wheel 2 //////
g2 = svg.append("g").attr("transform", "translate(" + 850 + "," + 540 + ")")
.attr("id", "wheel2")
document.getElementById("wheel2").style.display = "none";

// Generate the pie
var w2pie = d3.pie();

// Generate the arcs
var w2arc = d3.arc()
      .innerRadius(0)
      .outerRadius(radius_wheel2);

//Generate groups
var w2arcs = g2.selectAll("arc")
      .data(w2pie(Object.values(mammalSub)))
      .enter()
      .append("g")
      .attr("class", "arc")
     
//Draw arc paths
w2arcs.append("path")
  .attr("fill", "#1E99F9")
  .attr("d", w2arc);

//add text labels
w2arcs.append("text").attr("transform", function(d){
    d.innerRadius = 0;
    d.outerRadius = radius_wheel2;
    d.angle = (d.startAngle + d.endAngle)/2;
    return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")translate(" + (d.outerRadius -10) +")";
})
.attr("text-anchor", "end")
.style("font-size", 15)
.text( function(d, i) {
  return Object.keys(mammalSub)[i];
});



////// Wheel 1 //////
g = svg.append("g").attr("transform", "translate(" + 850 + "," + 540 + ")");

// Generate the pie
var w1pie = d3.pie();

// Generate the arcs
var w1arc = d3.arc()
      .innerRadius(0)
      .outerRadius(radius_wheel1);

//Generate groups
var w1arcs = g.selectAll("arc")
      .data(w1pie(Object.values(wheel1)))
      .enter()
      .append("g")
      .attr("class", "arc")
     
//Draw arc paths
w1arcs.append("path")
  .attr("fill", "#FFAE00")
  .attr("d", w1arc);

//add text labels
w1arcs.append("text").attr("transform", function(d){
    d.innerRadius = 0;
    d.outerRadius = radius_wheel1;
    d.angle = (d.startAngle + d.endAngle)/2;
    return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")translate(" + (d.outerRadius -10) +")";
})
.attr("text-anchor", "end")
.style("font-size", 14)
.text( function(d, i) {
    return Object.keys(wheel1)[i];
});


//make arrow
var arrow =svg.append("g")
g = svg.append("g").attr("transform", "translate(" + 1230 + "," + 540 + ")")
.append("path")
.attr("d", "M-" + (70) + ",0L0," + (20) + "L0,-" + (20) + "Z")
.style("fill","white");












// //attempt 2
// var radius = 100

// var pie = d3.pie()
//             .value(function(d) {return d.value; })
// var data_ready = pie(Object.entries(data))

// // var data_ready = pie(d3.entries(data))

// // shape helper to build arcs:
// var arcGenerator = d3.arc()
//                      .innerRadius(0)
//                      .outerRadius(radius)
// svg
// .selectAll('mySlices')
// .data(data_ready)
// .enter()
// .append('path')
// .attr('d', arcGenerator)
// .attr("stroke", "black")
// .style("stroke-width", "2px")
// .style("opacity", 0.7)

//   svg
//   .selectAll('mySlices')
//   .data(data_ready)
//   .enter()
//   .append('text')
//   .text(function(d){ return d.data.key})
//   .attr("transform", function(d) { return "translate(" + arcGenerator.centroid(d) + ")";  })
//   .style("text-anchor", "middle")
//   .style("font-size", 17)

       
  

//attempt 1
// const class_text= svg.append("text")
//                   .attr('x', 850)
//                   .attr('y', 540)
//                     .attr("text-anchor", "start")
//                     .attr("transform", "rotate("(2 * Math.PI /7)")")
//                     .text("mammal")
                    
//                     // .text(function(d, i) {return data[i].label;});
