var selectedUnterThema;

function selectUnterThema(unterThema) {
  selectedUnterThema = unterThema;
  drawChart(selectedUnterThema);
}

function scrollToHalfArc() {
  const halfArcElement = document.getElementById("halfArc");
  if (halfArcElement) {
    halfArcElement.scrollIntoView({ behavior: "smooth" });
  }
}
function scrollToHalfArc() {
  const halfArcElement = document.getElementById("halfArc");
  if (halfArcElement) {
    halfArcElement.scrollIntoView({ behavior: "smooth" });
  }
}

function updateAndDrawChartWithScroll(unterThema) {
  selectedUnterThema = unterThema; // Update the selectedUnterThema variable
  drawChart(selectedUnterThema); // Call your chart drawing function
  scrollToHalfArc(); // Scroll to the halfArc section
}

function createPieCharts(data, selectedUnterThema) {
  const width = 300;
  const height = 350;
  const radius = Math.min(width, height) / 4;
  const n = 0.5;
  const arcRadius = radius * n;
  const outerRadiusMax = radius * 1.5;
  const circleRadius = radius * 1.6;

  const colS = '#4B94A0'
  const colA = '#A6C5CC'
  const colorHightlight = '#AF223A'
  const colorStroke = '#173F4C'
  const colorText = '#DEF7FF'

  const pie = d3
    .pie()
    .sort(null)
    .value((d) => d.thema1_count);

  const uniqueThemes = Array.from(new Set(data.map((d) => d.thema)));

  uniqueThemes.forEach((theme, index) => {
    const themeData = data.filter((d) => d.thema === theme);
    const hoverThema1 = '';

    const svg = d3
      .create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto;")
      .attr("id", `chart-${index}`);


      const kategorieElement = svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", height -20)
      .attr("text-anchor", "middle")
      .style("font-size", "14px")
      .style('font-weight','bold')
      .style("font-family", "'Suisse Screen', sans-serif")
      .attr("fill", colorText)
      .text(theme);


    const textElement = svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", height )
      .attr("text-anchor", "middle")
      .style("font-size", "14px")
      .style("font-family", "'Suisse Screen', sans-serif")
      .attr("fill", colorText)
      .text(hoverThema1);

    const countTextElement = svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", height / 2 + 5)
      .attr("text-anchor", "middle")
      .style("font-size", "14px")
      .style('font-weight','bold')
      .style("font-family", "'Suisse Screen', sans-serif")
      .attr("fill", colorText)
      .text(themeData[0].thema_count);

    svg
      .append("circle")
      .attr("cx", width / 2)
      .attr("cy", height / 2)
      .attr("r", circleRadius) // Adjust the radius as needed
      .attr("stroke", colorStroke)
      .attr("fill", "none");

    function updateText(themeIndex, newText) {
      d3.select(`.text-${themeIndex}`).text(newText);
    }

    const arc = d3
      .arc()
      .innerRadius(arcRadius)
      .outerRadius((outerRadiusMax + arcRadius) * n)
      .cornerRadius(5);

    // .innerRadius((outerRadiusMax+arcRadius)*n)
    //(d) => radius * (0.8 + (d.data.thema1_ave / 100) * 0.8)
    //.outerRadius(((outerRadiusMax-((outerRadiusMax+arcRadius)*n))*dataObject.stimmbeteiligung /100) +((outerRadiusMax+arcRadius)*n))
    const bgArc = d3
      .arc()
      .innerRadius(radius * n)
      .outerRadius(
        (d) =>
          ((outerRadiusMax - (outerRadiusMax + arcRadius) * n) *
            d.data.thema1_ave) /
            100 +
          (outerRadiusMax + arcRadius) * n
      )
      .cornerRadius(5);

    svg
      .append("g")
      .selectAll()
      .data(pie(themeData))
      .join("path")
      .attr("stroke", colorStroke)
      .attr("fill", colS)
      .attr("d", bgArc)
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    svg
      .append("g")
      .selectAll()
      .data(pie(themeData))
      .join("path")
      .attr("stroke", colorStroke)
      .attr("fill", colA)
      .attr("d", arc)
      .attr("transform", `translate(${width / 2}, ${height / 2})`)
      .on("click", function (d) {
        selectedUnterThema = d.data.thema1;
        console.log("Click:", selectedUnterThema);
        drawChart(selectedUnterThema);
        scrollToHalfArc(); 
      })
      .on("mouseover", function (d) {
        d3.select(this)
          .attr("fill", colorHightlight)
          .attr(
            "d",
            arc
              .innerRadius(radius * n)
              .outerRadius((outerRadiusMax + arcRadius) * 0.65)
          )
          .style("cursor", "pointer")
        textElement.text(d.data.thema1);
        const dataPoint = themeData.find(
          (dataPoint) => dataPoint.thema1 === d.data.thema1
        );
        countTextElement.text(dataPoint.thema1_count).style('font-weight','normal')
      })
      .on("mouseout", function (d) {
        d3.select(this)
          .attr("fill", colA)
          .attr(
            "d",
            arc
              .innerRadius(radius * n)
              .outerRadius((outerRadiusMax + arcRadius) * n)
          )
          .style("cursor", "default")
        const dataPoint = themeData.find(
          (dataPoint) => dataPoint.thema1 === d.data.thema1
        );
        countTextElement.text(dataPoint.thema_count).style('font-weight','bold')
        textElement.text('');
      });

    document.body.appendChild(svg.node());
    d3.select("#chart-container").node().appendChild(svg.node());
  });
}

d3.csv("Data_Thema.csv").then(function (data) {
  data.forEach(function (d) {
    d.thema1_count = +d.thema1_count;
    d.thema1_ave = +d.thema1_ave;
  });
  createPieCharts(data);
});

function createHalfArcChart(data, selectedUnterThema) {
  const width = 1200;
  const height = 1500;
  const radius = Math.min(width, height) / 2;
  const arcRadius = radius * 0.2;
  const outerRadiusMax = radius * 0.8;
  const n = 0.4;

  const colorS = "#4B94A0";
  const colorJ = "#A6C5CC";
  const colS = '#4B94A0'
  const colA = '#A6C5CC'
  const colorHightlight = '#AF223A'
  const colorStroke = '#173F4C'
  const colorText = '#DEF7FF'


  const yearData = new Map();

  data.forEach((d) => {
    const year = d.year;
    const thema1 = d.thema1;

    if (!yearData.has(year)) {
      yearData.set(year, []);
    }

    yearData.get(year).push(thema1);
  });

  const years = Array.from(yearData.keys());

  const yearDataLookup = {};
  data.forEach((d) => {
    const year = d.year;

    if (!yearDataLookup[year]) {
      yearDataLookup[year] = [];
    }

    yearDataLookup[year].push(d);
  });

  console.log("yearDataLookup", yearDataLookup);

  const svg = d3
    .create("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .attr("id", `halfArc`)
    .attr("style", "max-width: 100%; height: auto;");

  const selectedData = data.find((d) => d.thema1 === selectedUnterThema);

  /// TITEL
  const  titleText = selectedData
    ? `${selectedData.thema1_count} Abstimmungen in « ${selectedUnterThema} » über 175 Jahre`
    : "Default Title";
    

  const titel = svg
    .append("text")
    .attr("x", width / 2)
    .attr("y", 200)
    .attr("text-anchor", "middle")
    .style("font-size", "24px")
    .style("font-weight", "bold")
    .style("font-family", "'Suisse Screen', sans-serif")
    .attr("fill", colorText)
    .text(titleText);

  ///HOVER INFORMATION
  const yearElement = svg
    .append("text")
    .attr("x", width / 2)
    .attr("y", height / 2)
    .attr("text-anchor", "middle")
    .style("font-size", "18px")
    .style("font-family", "'Suisse Screen', sans-serif")
    .attr("fill", colorJ);

  const abstimmungElement = svg
    .append("text")
    .attr("x", width / 2)
    .attr("y", height / 2 + 100)
    .attr("text-anchor", "middle")
    .style("font-size", "18px")
    .style("font-family", "'Suisse Screen', sans-serif");

  ////JAHR LEGENDE
  svg
    .append("text")
    .attr("x", width / 2 - 100)
    .attr("y", height / 2 + 35)
    .attr("text-anchor", "middle")
    .style("font-size", "10px")
    .style("font-family", "'Suisse Screen', sans-serif")
    .attr("fill", colorJ)
    .text("1848");

  svg
    .append("text")
    .attr("x", width / 2 + 100)
    .attr("y", height / 2 + 35)
    .attr("text-anchor", "middle")
    .style("font-size", "10px")
    .style("font-family", "'Suisse Screen', sans-serif")
    .attr("fill", colorJ)
    .text("2023");

  svg
    .append("line")
    .attr("x1", width / 2 + 100)
    .attr("y1", height / 2)
    .attr("x2", width / 2 + 110)
    .attr("y2", height / 2)
    .attr("stroke-weight", 1)
    .attr("stroke-opacity", 0.5)
    .attr("stroke", colorJ);

  svg
    .append("line")
    .attr("x1", width / 2 - 100)
    .attr("y1", height / 2)
    .attr("x2", width / 2 - 110)
    .attr("y2", height / 2)
    .attr("stroke-weight", 1)
    .attr("stroke-opacity", 0.5)
    .attr("stroke", colorJ);

  const startX = width / 2 - 100;
  const startY = height / 2;
  const controlPoint1X = width / 2 - 90; // Adjust this for the first control point
  const controlPoint1Y = height / 2 - 130; // Adjust this for the first control point
  const controlPoint2X = width / 2 + 90; // Adjust this for the second control point
  const controlPoint2Y = height / 2 - 130; // Adjust this for the second control point
  const endX = width / 2 + 100;
  const endY = height / 2;

  const path = `M ${startX} ${startY} C ${controlPoint1X} ${controlPoint1Y}, ${controlPoint2X} ${controlPoint2Y}, ${endX} ${endY}`;

  svg
    .append("path")
    .attr("d", path)
    .attr("stroke", colorJ)
    .attr("stroke-width", 1)
    .attr("stroke-opacity", 0.5)
    .attr("fill", "none")
    .attr("id", "curve");

  const text = svg.append("text").attr("dy", "1em");

  text
    .append("textPath")
    .attr("xlink:href", "#curve")
    .style("font-size", "10px")
    .style("font-family", "'Suisse Screen', sans-serif")
    .attr("fill", colorJ)
    .text("Jahre")
    .attr("startOffset", "50%")
    .attr("text-anchor", "middle")
    .attr("dy", "-30em");

  ///STIMMBETEILIGUNG LEGENDE
  svg
    .append("text")
    .attr("x", width / 2 + 480)
    .attr("y", height / 2 + 35)
    .attr("text-anchor", "middle")
    .style("font-size", "10px")
    .style("font-family", "'Suisse Screen', sans-serif")
    .attr("fill", colorS)
    .text("100%");

  svg
    .append("text")
    .attr("x", width / 2 + 245)
    .attr("y", height / 2 + 35)
    .attr("text-anchor", "middle")
    .style("font-size", "10px")
    .style("font-family", "'Suisse Screen', sans-serif")
    .attr("fill", colorS)
    .text("0%");

  svg
    .append("text")
    .attr("x", width / 2 + 367.5)
    .attr("y", height / 2 + 35)
    .attr("text-anchor", "middle")
    .style("font-size", "10px")
    .style("font-family", "'Suisse Screen', sans-serif")
    .attr("fill", colorS)
    .text("Stimmbeteiligung");

  svg
    .append("line")
    .attr("x1", width / 2 + 240)
    .attr("y1", height / 2 + 20)
    .attr("x2", width / 2 + 480)
    .attr("y2", height / 2 + 20)
    .attr("stroke-weight", 2)
    .attr("stroke", colorS);

  svg
    .append("line")
    .attr("x1", width / 2 + 240)
    .attr("y1", height / 2 + 20)
    .attr("x2", width / 2 + 240)
    .attr("y2", height / 2 + 5)
    .attr("stroke-weight", 2)
    .attr("stroke", colorS);

  svg
    .append("line")
    .attr("x1", width / 2 + 480)
    .attr("y1", height / 2 + 20)
    .attr("x2", width / 2 + 480)
    .attr("y2", height / 2 + 5)
    .attr("stroke-weight", 2)
    .attr("stroke", colorS);

  svg
    .append("text")
    .attr("x", width / 2 - 480)
    .attr("y", height / 2 + 35)
    .attr("text-anchor", "middle")
    .style("font-size", "10px")
    .style("font-family", "'Suisse Screen', sans-serif")
    .attr("fill", colorS)
    .text("100%");

  svg
    .append("text")
    .attr("x", width / 2 - 245)
    .attr("y", height / 2 + 35)
    .attr("text-anchor", "middle")
    .style("font-size", "10px")
    .style("font-family", "'Suisse Screen', sans-serif")
    .attr("fill", colorS)
    .text("0%");

  svg
    .append("text")
    .attr("x", width / 2 - 367.5)
    .attr("y", height / 2 + 35)
    .attr("text-anchor", "middle")
    .style("font-size", "10px")
    .style("font-family", "'Suisse Screen', sans-serif")
    .attr("fill", colorS)
    .text("Stimmbeteiligung");

  svg
    .append("line")
    .attr("x1", width / 2 - 240)
    .attr("y1", height / 2 + 20)
    .attr("x2", width / 2 - 480)
    .attr("y2", height / 2 + 20)
    .attr("stroke-weight", 2)
    .attr("stroke", colorS);

  svg
    .append("line")
    .attr("x1", width / 2 - 240)
    .attr("y1", height / 2 + 20)
    .attr("x2", width / 2 - 240)
    .attr("y2", height / 2 + 5)
    .attr("stroke-weight", 2)
    .attr("stroke", colorS);

  svg
    .append("line")
    .attr("x1", width / 2 - 480)
    .attr("y1", height / 2 + 20)
    .attr("x2", width / 2 - 480)
    .attr("y2", height / 2 + 5)
    .attr("stroke-weight", 2)
    .attr("stroke", colorS);

  /////

  const themaToHighlight = selectedUnterThema;
  console.log("themaToHighlight:", themaToHighlight);
  const highlightedColor = "#305C66";

  const pie = d3
    .pie()
    .startAngle(90 * (Math.PI / 180))
    .endAngle(-90 * (Math.PI / 180))
    .sort(null)
    .value(() => 1);

  const arc = d3
    .arc()
    .innerRadius(arcRadius)
    .outerRadius(outerRadiusMax)
    .cornerRadius(10);

  console.log(years);

  ///STIMMBETEILIGUNG ARC
  const Stimmbeteiligung = svg
    .append("g")
    .selectAll()
    .data(pie(years))
    .join("path")
    .attr("stroke", colorS)
    .attr("stroke-opacity", 0.3)
    .attr("fill", (d) =>
      yearData.get(d.data).includes(themaToHighlight) ? colorS : "none"
    )
    .attr("d", function (d) {
      const year = d.data;
      const dataObjects = yearDataLookup[year];
      const matchingData = dataObjects.find(
        (dataObject) => dataObject.thema1 === themaToHighlight
      );

      if (matchingData) {
        const stimmbeteiligung = matchingData.stimmbeteiligung;

        const outerRadius =
          ((outerRadiusMax - (outerRadiusMax + arcRadius) * n) *
            stimmbeteiligung) /
            100 +
          (outerRadiusMax + arcRadius) * n;
        return arc
          .innerRadius((outerRadiusMax + arcRadius) * n)
          .outerRadius(outerRadius)
          .cornerRadius(10)(d);
      } else {
        return arc
          .innerRadius((outerRadiusMax + arcRadius) * n)
          .outerRadius(outerRadiusMax)
          .cornerRadius(10)(d);
      }
    })
    .attr("transform", `translate(${width / 2}, ${height / 2})`)
    .on("mouseover", function (d) {
      const year = d.data;
      const dataObjects = yearDataLookup[year];
      const matchingData = dataObjects.find(
        (dataObject) => dataObject.thema1 === themaToHighlight
      );

      console.log(matchingData);
      d3.select(this).attr("fill", matchingData ? colorHightlight : "none")
      .style("cursor", "pointer")
  
      if (matchingData) {
        abstimmungElement
          .text(matchingData.vorlage_titel_de)
          .attr("fill", "#DEF7FF");
        yearElement
          .text(matchingData.stimmbeteiligung + "%")
          .attr("fill", colorS);
      } else {
        abstimmungElement.text("");
        yearElement.text("");
      }
    })
    .on("mouseout", function (d) {
      d3.select(this).attr(
        "fill",
        yearData.get(d.data).includes(themaToHighlight)
          ? colorHightlight
          : 'none'
      )
      .style("cursor", "default")
      abstimmungElement.text("");
    });

  ////JAHR ARC
  const innererHalbkreis = svg
    .append("g")
    .selectAll()
    .data(pie(years))
    .join("path")
    .attr("stroke", colorJ)
    .attr("stroke-opacity", 0.2)
    .attr("fill", (d) =>
      yearData.get(d.data).includes(themaToHighlight) ? colorJ : "none"
    )
    .attr("d", function (d) {
      const dataObject = yearDataLookup[d.data];
      if (
        dataObject &&
        dataObject.stimmbeteiligung &&
        yearData.get(d.data).includes(themaToHighlight)
      ) {
        return arc
          .innerRadius(arcRadius)
          .outerRadius((outerRadiusMax + arcRadius) * n)
          .cornerRadius(10)(d);
      } else {
        return arc
          .innerRadius(arcRadius)
          .outerRadius((outerRadiusMax + arcRadius) * n)
          .cornerRadius(10)(d);
      }
    })
    .attr("transform", `translate(${width / 2}, ${height / 2})`)
    .on("click", function (d) {
      const year = d.data;
      const dataObjects = yearDataLookup[year];
      const matchingData = dataObjects.find(
        (dataObject) => dataObject.thema1 === themaToHighlight
      )
    
      if (matchingData) {
        const imageUrl = matchingData.ImageURL; 
        const imageWidth = 1000; 
        const imageHeight = 2000; 
        addImage(svg,imageUrl);
      } 
    })
    .on("mouseover", function (d) {
      const year = d.data;
      const dataObjects = yearDataLookup[year];
      const matchingData = dataObjects.find(
        (dataObject) => dataObject.thema1 === themaToHighlight
      );

      d3.select(this).attr("fill", matchingData ?colorHightlight : "none")
      .style("cursor", "pointer")
      if (matchingData) {
        abstimmungElement
          .text(matchingData.vorlage_titel_de)
          .attr("fill", colorText)
        yearElement.text(matchingData.year).attr("fill", colorJ);
      } else {
        abstimmungElement.text("");
        yearElement.text("");
      }
    })
    .on("mouseout", function (d) {
      d3.select(this).attr(
        "fill",
        yearData.get(d.data).includes(themaToHighlight) ? colorJ : "none"
      )
      .style("cursor", "default")
      abstimmungElement.text("");
    });

  ////UPDATE
  let existentChart = document.getElementById("halfArc");
  if (existentChart != null) {
    d3.select("#chart-container").node().removeChild(existentChart);
  }
  d3.select("#chart-container").node().appendChild(svg.node());
}

function addImage(svg,imageUrl) {
  svg
    .append("image")
    .attr("xlink:href", imageUrl)
    .attr("x", 600-500)
    .attr("y", 750)
    .attr("width", 1000)
    .attr("height", 1200);
}

function drawChart(thema) {
  d3.csv("Data02.csv").then(function (data) {
    createHalfArcChart(data, thema);
  });
}
