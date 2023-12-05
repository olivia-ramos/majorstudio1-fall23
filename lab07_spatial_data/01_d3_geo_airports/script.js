// code from:
// https://observablehq.com/@d3/world-airports?collection=@d3/d3-geo

/*** global variable/s ***/
const width = 1000;

/*** helper function ***/
function height(projection, outline) {
  const [[x0, y0], [x1, y1]] = d3.geoPath(projection.fitWidth(width, outline)).bounds(outline);
  const dy = Math.ceil(y1 - y0), l = Math.min(Math.ceil(x1 - x0), dy);
  
  projection.scale(projection.scale() * (l - 1) / l).precision(0.2);
  return dy;
}

/*** our draw function ***/ //this is for gray base map
function drawMap(world, data) {
  const land = topojson.feature(world, world.objects.land);
  const graticule = d3.geoGraticule10();
  const outline = { type: "Sphere" };
  const projection = d3.geoNaturalEarth1();// think back to GIS class; this is where can specify map projection
  const path = d3.geoPath(projection);

  const svg = d3.select('body')
    .append("svg")
    .attr("viewBox", [0, 0, width, height(projection, outline)]);

  const defs = svg.append("defs");

  defs.append("path")
      .attr("id", "outline")
      .attr("d", path(outline));

  defs.append("clipPath")
    .attr("id", "clip")
    .append("use")
    .attr("xlink:href", new URL("#outline", location));

  const g = svg.append("g")
    .attr("clip-path", `url(${new URL("#clip", location)})`);

  g.append("use")
    .attr("xlink:href", new URL("#outline", location))
    .attr("fill", "#fff");

  g.append("path")
    .attr("d", path(graticule))
    .attr("stroke", "#ddd")
    .attr("fill", "none");

  g.append("path")
    .attr("d", path(land))
    .attr("fill", "#ddd");

  svg.append("use")
    .attr("xlink:href", new URL("#outline", location))
    .attr("stroke", "#000")
    .attr("fill", "none");

    //appending the group with circles (data points for airports on base map; we group together with "g" since we're using svg. if we were in the dom we're use a div)
  svg.append("g")
    .selectAll("circle")
    .data(data)
    .join("circle")
    .attr("transform", d => `translate(${projection([d.longitude, d.latitude])})`)
    .attr("r", 1.5)// this is only 1.5 pixels which is appropriate size for visible circle; may consider putting an invisible larger circle behind so that when user mouses over they have an easier time getting hover for title. consider the user experience! 
    .append("title")
    .text(d => d.name);
}

/*** load data ***/
async function loadData() {
  const world = await d3.json('data/land-50m.json'); //waiting bc it could be a big file! await is a promise. same concept as async; or then. basically means we can start drawing map without having everything in place.
  const airports = await d3.csv('data/airports.csv');

  drawMap(world, airports)
}

loadData();