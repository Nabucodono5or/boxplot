import { select, selectAll } from "d3-selection";
import { csv } from "d3-fetch";
import { axisBottom, axisRight, axisTop, axisLeft } from "d3-axis";
import { scaleLinear } from "d3-scale";
import { max } from "d3-array";

csv(require("./data/boxplots.csv")).then((data) => {
  console.log(data);
  boxplot(data);
});

function boxplot(incomingData) {
  let maximoMedian = max(incomingData, (d) => {
    return d.median;
  });

  let maximoDay = max(incomingData, (d) => {
    return d.day;
  });
  let yScale = scaleLinear().domain([0, 100]).range([470, 20]);
  let xScale = scaleLinear().domain([1, maximoDay]).range([0, 470]);
  let yAxis = axisLeft(yScale).tickSize(-470);
  let xAxis = axisBottom(xScale)
    .tickValues([1, 2, 3, 4, 5, 6, 7])
    .tickSize(-470);

  select("svg")
    .append("g")
    .attr("transform", "translate(20, 10)")
    .style("opacity", 0.5)
    .call(yAxis);

  select("svg")
    .append("g")
    .attr("transform", "translate(20, 480)")
    .style("opacity", 0.6)
    .call(xAxis);

  select("svg")
    .selectAll("g.box")
    .data(incomingData)
    .enter()
    .append("g")
    .attr("class", "box")
    .attr("transform", function (d) {
      return "translate(" + (xScale(d.day) + 20) + "," + yScale(d.median) + ")";
    })
    .each(function (d) {
      select(this).append("circle").attr("r", 10).style("fill", "darkgray");
    });
}
