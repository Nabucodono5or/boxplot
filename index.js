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
  let maximoDay = max(incomingData, (d) => {
    return d.day;
  });

  let yScale = scaleLinear().domain([0, 100]).range([470, 20]);
  let xScale = scaleLinear().domain([0, maximoDay]).range([0, 470]);

  let yAxis = axisLeft(yScale).tickSize(-520).tickPadding(7);
  let xAxis = axisBottom(xScale)
    .tickValues([0, 1, 2, 3, 4, 5, 6, 7])
    .tickSize(-470)
    .tickPadding(7);

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
    //   select(this).append("circle").attr("r", 10).style("fill", "darkgray");

      select(this)
        .append("line")
        .attr("x1", 0)
        .attr("x2", 0)
        .attr("y1", yScale(d.max) - yScale(d.median))
        .attr("y2", yScale(d.min) - yScale(d.median))
        .style("stroke", "#457b9d")
        .style("stroke-width", "4px");

      select(this)
        .append("line")
        .attr("class", "max")
        .attr("x1", -10)
        .attr("x2", 10)
        .attr("y1", yScale(d.max) - yScale(d.median))
        .attr("y2", yScale(d.max) - yScale(d.median))
        .style("stroke", "#457b9d")
        .style("stroke-width", "4px");

      select(this)
        .append("line")
        .attr("class", "min")
        .attr("x1", -10)
        .attr("x2", 10)
        .attr("y1", yScale(d.min) - yScale(d.median))
        .attr("y2", yScale(d.min) - yScale(d.median))
        .style("stroke", "#457b9d")
        .style("stroke-width", "4px");

      select(this)
        .append("rect")
        .attr("class", "distribution")
        .attr("height", yScale(d.q1) - yScale(d.q3))
        .attr("x", -10)
        .attr("y", yScale(d.q3) - yScale(d.median))
        .attr("width", 20)
        .style("fill", "#f1faee")
        .style("stroke", "black")
        .style("stroke-width", "1px");

      select(this)
        .append("line")
        .attr("class", "median")
        .attr("x1", -10)
        .attr("x2", 10)
        .style("stroke", "#e63946")
        .style("stroke-width", "4px");
    });
}
