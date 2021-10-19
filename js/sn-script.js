/*

    PROJECT NAME: sn INSIGHTS BOOTSTRAP 4 REPSONSIVE TEMPLATE 
    CREATED BY: JAMES BAYLISS
    CREATED BETWEEN: MAY 2020 -> JUNE/2020
    TECHNOLOGIES USED: d3 v5, JS, JQuery, HTML5, CSS3
    USEFUL LINKS:

    LAST UPPATED
    */

/*
    NAME:
    DESCRIPTION:
    ARGUMENTS TAKEN:
    ARGUMENTS RETURNED:
    CALLED FROM: 
    CALLS: 
*/

// margin set for main focus visual
var margin = {
  left: 25,
  right: 25,
  top: 25,
  bottom: 25,
};

var isScrolling;

window.onresize = windowSize;
window.onpaint = preloadFunc();

/*
    NAME: preloadFunc
    DESCRIPTION: initial PRELOAD function to handle some operations before loading page
    ARGUMENTS TAKEN: none
    ARGUMENTS RETURNED: none
    CALLED FROM: script.js
    CALLS: alertSize
*/
function preloadFunc() {

  console.log(sn);
  d3.selectAll(".browserTabTitle").text(sn.browserTabTitle)
  alertSize();

  return;
} // end function preloadFunc

/*
    NAME:onload
    DESCRIPTION: initial function called by DOM body at point of page load
    ARGUMENTS TAKEN: none
    ARGUMENTS RETURNED: none
    CALLED FROM: index.html
    CALLS:  pageVisualSetup();
            loadData();
*/
function onload() {
  // call function to load CSV data file
  loadData();

  // call function to make basic page dimension formatting
  pageVisualSetup();

  return;
} // end function onload

/*
    NAME: loadData
    DESCRIPTION: function to load data and add additional value-added information
    ARGUMENTS TAKEN: none
    ARGUMENTS RETURNED: none
    CALLED FROM: onload
    CALLS: drawChart
*/
function loadData() {
  // load CSV data file
  d3.csv("data/data.csv")
    .then(function (data) {
      // for each data row ... process and add information needed
      data.forEach(function (d, i) {
        //  console.log(i,d)
      });

      // call function to initially draw chart
      drawChart(data);
    })
    .catch(function (error) {
      console.log(error);
    });

  return;
} // end function loadData

/*
    NAME: pageVisualSetup
    DESCRIPTION: function to build initial basis for page visual
    ARGUMENTS TAKEN: none
    ARGUMENTS RETURNED: none
    CALLED FROM: onload
    CALLS: none
*/
function pageVisualSetup() {
  // select DOM div base for building, attach SVG panel and group element
  d3.selectAll(".sn-visual")
    .append("svg")
    .attr("class", "sn-svgVisualBase")
    .attr("transform", "translate(" + 0 + "," + 0 + ")")
    .append("g")
    .attr("class", "sn-svgVisualBase-G")
    .attr("transform", "translate(" + 0 + "," + 0 + ")");

  return;
} // end function pageVisualSetup

/*
    NAME: drawChart 
    DESCRIPTION: function to intiailly draw chart
    ARGUMENTS TAKEN: data - all data from CSV files
    ARGUMENTS RETURNED: none
    CALLED FROM: loadData
    CALLS:  drawLegend
            drawControls
            alertSize

    https://thenounproject.com/search/?q=close&i=3318594
    https://thenounproject.com/search/?q=close&i=3318594
   
*/
function drawChart(data) {
  // locally store variables relating to SVG groups elements
  svg = d3.selectAll(".sn-svgVisualBase-G");

  // call functions to draw controls and legends and find key screen dimensions
  alertSize();

  // get width of base DIV on which to build chart
  visualWidth = document.getElementById("visual").clientWidth;
  visualHeight = document.getElementById("visual").clientHeight;

  d3.selectAll(".sn-svgVisualBase")
    .attr("width", visualWidth)
    .attr("height", visualHeight);

  return;
} // end function drawChart();

/*
    NAME: windowSize 
    DESCRIPTION: function called when user resizes window. handles updating of content reliant on dimension of window
    ARGUMENTS TAKEN: none
    ARGUMENTS RETURNED: none
    CALLED FROM: none
    CALLS:  none

    http://bl.ocks.org/johangithub/97a186c551e7f6587878
*/
function windowSize() {
  // update glvbal wisdth varaible based on new window dimensions
  // accommodarte small window siz efor left margin

  visualWidth = document.getElementById("visual").clientWidth;
  visualHeight = document.getElementById("visual").clientHeight;

  // update width value of visual DIV after updating margins based on screen size
  // width = visualWidth - margin.left - margin.right;

  d3.selectAll(".sn-svgVisualBase")
    .attr("width", visualWidth)
    .attr("height", visualHeight);

  return;
} // end function windowSize

/*
    NAME: getMouseCoordinates 
    DESCRIPTION: function to ascertain pixel coordinates of mouse cursor
    ARGUMENTS TAKEN: ev - fid
    ARGUMENTS RETURNED:  { x: x, y: y } - object contianing coorsinates of mouse cursor. updated with mouse move
    CALLED FROM: on mouseover of polygon geom.
    CALLS:  none
*/
function getMouseCoordinates(fid) {
  var coordinates = d3.mouse(fid);

  var x = coordinates[0];
  var y = coordinates[1];

  return { x: x, y: y };
} // end function getMouseCoordinates

/*
    NAME: onscroll 
    DESCRIPTION: anonymous function to handle vertical user scrolling
    ARGUMENTS TAKEN:    ev: scorll event
    ARGUMENTS RETURNED: none
    CALLED FROM: on scrolling
    CALLS:  none

    http://bl.ocks.org/johangithub/97a186c551e7f6587878
*/
window.onscroll = function (ev) {
  if (window.scrollY == 0) {
    // you're at the TOP of the page
    console.log("you're at the TOP of the page");
  } else if (
    window.innerHeight + window.scrollY >=
    document.body.offsetHeight
  ) {
    // you're at the BOTTOM of the page
    console.log("you're at the BOTTOM of the page");
  } else {
    // you're in the MIDDLE of the page
    console.log("you're at the MIDDLE of the page");
  }

  return;
}; // end function onscroll

// Listen for scroll events
window.addEventListener(
  "scroll",
  function (event) {
    d3.selectAll(".scroll").classed("stopped", false).classed("moving", true);

    // Clear our timeout throughout the scroll
    window.clearTimeout(isScrolling);

    // Set a timeout to run after scrolling ends
    isScrolling = setTimeout(function () {
      // Run the callback
      /*   console.log('Scrolling has stopped.'); */
      d3.selectAll(".scroll").classed("stopped", true).classed("moving", false);
    }, 50);
  },
  false
);
