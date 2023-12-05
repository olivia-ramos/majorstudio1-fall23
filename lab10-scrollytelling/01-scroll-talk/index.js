const margin = 20;

d3.json("./jabberwocky.json").then(data => {
  const section = d3
    .select(".sections")
    .selectAll(".section")
    .data(data)
    .join("div")
    .attr("class", (d, i) => "section section-" + i)// we give 2 classes; one is called section, one is unique class section 1-6
    .html(d => d.join("<br>"));


  //compute the positions of the sections we're going to scroll in 
  let sectionPositions = [];
  section.each(function() {
    const { top } = this.getBoundingClientRect();
    sectionPositions.push(top); // we're storing the positions in sectionPositions; we know it's an array because we're pushing into it
  });

  // https://vallandingham.me/scroller.html#detecting-the-active-section
  function position() {
    var pos = window.scrollY - 10;
    var sectionIndex = d3.bisect(sectionPositions, pos);//look up bisect on mozilla to review how it works. returns index (position) to the right of the match
    sectionIndex = Math.min(section.size() - 1, sectionIndex);//want to get the index that is the largest possible size? makes it safe/worst case scenario


  //no matter what we're doing, we have the current index. checking which index number we're in then writing into our state
    if (state.currentIndex !== sectionIndex) {
      setState({
        currentIndex: sectionIndex,
      });
    }
  }

  window.addEventListener("scroll", position); // scroll is the event, posititon is the callback "who it's going to notify"

  draw();
});

function setup() { // setup is the actual bar chart set up
  const viz = d3.select(".viz");
  const svg = viz
    .append("svg")
    .attr("height", 500)
    .attr("width", 500);

  svg.append("g").attr("class", "bars");

  const xAxis = svg
    .append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(0, ${margin})`);
  const yAxis = svg
    .append("g")
    .attr("class", "y-axis")
    .attr("transform", `translate(${margin}, 0)`);
}

let state = {
  currentIndex: 0,
};

function setState(nextState) {
  console.log(nextState);
  state = { ...state, ...nextState };
  draw(); //everytime the state changes we have to redraw; that makes the graph change
}

function draw() {
  const { currentIndex } = state;
  console.log('currentIndex', currentIndex)
  const section = d3
    .selectAll(".section")
    .classed("current", (_, i) => i === currentIndex);//saying whatever the one we're in now has a new class that we're gonna name current. the underscore is saying we aren't using d, just i! "nothing, i"

  const alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const sectionText = section
    .filter((_, i) => i === currentIndex)
    .text()
    .toUpperCase();
  const data = alpha.map(letter => ({
    letter,
    value: [...sectionText.matchAll(letter)].length,//match all gives an array. this is length of bar at any time
  }));
  console.log(data);

  const svg = d3.select("svg");

  const xScale = d3
    .scaleLinear()
    .domain([0, 15])
    .range([margin, 500 - margin]);

  const yScale = d3
    .scaleBand()
    .paddingInner(0.1)
    .domain(alpha)
    .range([margin, 500 - margin]);

  svg
    .select(".bars")
    .selectAll("rect.bar")
    .data(data)
    .join("rect")
    .attr("class", "bar")
    .attr("x", xScale(0))
    .attr("y", d => yScale(d.letter))
    .attr("height", yScale.bandwidth())
    .transition() // this is the animation (move from old bar to new bar instead of abrupt jump)
    .attr("width", d => xScale(d.value) - margin);

  svg
    .select(".bars")
    .selectAll("text.bar")
    .data(data)
    .join("text")
    .attr("class", "bar")
    .attr("y", d => yScale(d.letter) + 12)
    .text(d => d.value || "")
    .transition()
    .attr("x", d => xScale(d.value) - 5);

  svg.select(".x-axis").call(d3.axisTop(xScale));
  svg.select(".y-axis").call(d3.axisLeft(yScale));
}

setup();
