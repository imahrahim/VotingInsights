function createLegende() {
  const width = 1000;
  const height = 700;

  const colS = "#4B94A0";
  const colA = "#A6C5CC";
  const colorHightlight = "#AF223A";
  const colorStroke = "#173F4C";
  const colorText = "#DEF7FF";

  const radius = Math.min(width, height) / 3;
  const innerRadius = radius * 0.5;
  const outerRadius = radius * 0.8;
  const startAngle = 0;
  const endAngle = Math.PI / 2;

  const svg = d3
    .create("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .attr("style", "max-width: 100%; height: auto;")
    .attr("id", "legende");


    function createArcs(){


      const arcS = d3
      .arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius)
      .startAngle(Math.PI / 2)
      .endAngle(90)
      .cornerRadius(5);

    svg
      .append("path")
      .attr("d", arcS)
      .attr("transform", `translate(${width / 2}, ${height / 2})`)
      .attr("fill", colS)
      .attr('opacity',0.2)
      .attr("stroke", colorStroke);

      const arcA = d3
      .arc()
      .innerRadius(innerRadius*0.5)
      .outerRadius(innerRadius)
      .startAngle(Math.PI / 2)
      .endAngle(90)
      .cornerRadius(5);

    svg
      .append("path")
      .attr("d", arcA)
      .attr("transform", `translate(${width / 2}, ${height / 2})`)
      .attr("fill", colA)
      .attr('opacity',0.2)
      .attr("stroke", colorStroke);

    }

  function createKategorie() {
    const Kategorie = svg
      .append("text")
      .attr("x", width / 2 + 300)
      .attr("y", height - 70)
      .attr("text-anchor", "left")
      .style("font-size", "14px")
      .style("font-weight", "bold")
      .style("font-family", "'Suisse Screen', sans-serif")
      .attr("fill", colorText)
      .text("Kategorie")
      .on("mouseover", handleKategorieHover)
      .on("mouseout", handleKategorieMouseout);

    function handleKategorieHover() {
      // svg.select("circle").attr("fill", colorHightlight).attr("opacity", 0.2);
      svg.select("#k").attr("fill", colorHightlight);
    }

    function handleKategorieMouseout() {
      // svg.select("circle").attr("fill", "none");
      svg.select("#k").attr("fill", colorText);
    }

    svg
      .append("circle")
      .attr("cx", width / 2)
      .attr("cy", height / 2)
      .attr("r", radius)
      .attr("stroke", colorStroke)
      .attr("fill", "none");

    const historischeAb = svg
      .append("text")
      .attr("id", "k")
      .attr("x", width / 2)
      .attr("y", height - 70)
      .attr("text-anchor", "middle")
      .style("font-size", "18px")
      .style("font-weight", "bold")
      .style("font-family", "'Suisse Screen', sans-serif")
      .attr("fill", colorText)
      .text("Historische Abstimmungen");

    svg
      .append("line")
      .attr("x1", width / 2 + 140)
      .attr("y1", height - 75)
      .attr("x2", width / 2 + 280)
      .attr("y2", height - 75)
      .attr("stroke-weight", 2)
      .attr("stroke", colorHightlight);
  }

  function createThema() {
    const Thema = svg
      .append("text")
      .attr("x", width / 2 + 200)
      .attr("y", 100)
      .attr("text-anchor", "left")
      .style("font-size", "14px")
      .style("font-weight", "bold")
      .style("font-family", "'Suisse Screen', sans-serif")
      .attr("fill", colA)
      .text("Themenhäufigkeit")
      .on("mouseover", handleThemaHover)
      .on("mouseout", handleThemaMouseout);

    function handleThemaHover() {
      svg.select("#a").attr("fill", colorHightlight);
    }

    function handleThemaMouseout() {
      svg.select("#a").attr("fill", colA);
    }

    const arcA = d3
      .arc()
      .innerRadius(innerRadius * 0.5)
      .outerRadius(innerRadius)
      .startAngle(startAngle)
      .endAngle(endAngle)
      .cornerRadius(5);

    svg
      .append("path")
      .attr("id", "a")
      .attr("d", arcA)
      .attr("transform", `translate(${width / 2}, ${height / 2})`)
      .attr("fill", colA)
      .attr("stroke", colorStroke);

    svg
      .append("line")
      .attr("x1", width / 2 + 80)
      .attr("y1", height / 2 - 50)
      .attr("x2", width / 2 + 265)
      .attr("y2", height / 2 - 50)
      .attr("stroke-weight", 2)
      .attr("stroke", colorHightlight);

    svg
      .append("line")
      .attr("x1", width / 2 + 265)
      .attr("y1", height / 2 - 230)
      .attr("x2", width / 2 + 265)
      .attr("y2", height / 2 - 50)
      .attr("stroke-weight", 2)
      .attr("stroke", colorHightlight);
  }

  function createStimmbeteiligung() {
    const Stimmbeteiligung = svg
      .append("text")
      .attr("x", width / 2 - 300)
      .attr("y", height / 2 - 275)
      .attr("text-anchor", "left")
      .style("font-size", "14px")
      .style("font-weight", "bold")
      .style("font-family", "'Suisse Screen', sans-serif")
      .attr("fill", colS)
      .text("Stimmbeteiligung")
      .on("mouseover", handleStimmHover)
      .on("mouseout", handleStimmMouseout);

    function handleStimmHover() {
      svg.select("#s").attr("fill", colorHightlight);
    }

    function handleStimmMouseout() {
      svg.select("#s").attr("fill", colS);
    }

    const arcS = d3
      .arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius)
      .startAngle(startAngle)
      .endAngle(endAngle)
      .cornerRadius(5);

    svg
      .append("path")
      .attr("id", "s")
      .attr("d", arcS)
      .attr("transform", `translate(${width / 2}, ${height / 2})`)
      .attr("fill", colS)
      .attr("stroke", colorStroke);

    svg
      .append("line")
      .attr("x1", width / 2 - 10)
      .attr("y1", height / 2 - 117)
      .attr("x2", width / 2 - 10)
      .attr("y2", height / 2 - 280)
      .attr("stroke-weight", 2)
      .attr("stroke", colorHightlight);

    svg
      .append("line")
      .attr("x1", width / 2)
      .attr("y1", height / 2 - 117)
      .attr("x2", width / 2 - 10)
      .attr("y2", height / 2 - 117)
      .attr("stroke-weight", 2)
      .attr("stroke", colorHightlight);

    svg
      .append("line")
      .attr("x1", width / 2)
      .attr("y1", height / 2 - 232)
      .attr("x2", width / 2 - 10)
      .attr("y2", height / 2 - 232)
      .attr("stroke-weight", 2)
      .attr("stroke", colorHightlight);

    svg
      .append("line")
      .attr("x1", width / 2 - 10)
      .attr("y1", height / 2 - 280)
      .attr("x2", width / 2 - 160)
      .attr("y2", height / 2 - 280)
      .attr("stroke-weight", 2)
      .attr("stroke", colorHightlight);

    svg
      .append("text")
      .attr("x", width / 2 - 55)
      .attr("y", height / 2 - 228)
      .attr("text-anchor", "left")
      .style("font-size", "12px")
      .style("font-weight", "bold")
      .style("font-family", "'Suisse Screen', sans-serif")
      .attr("fill", colorHightlight)
      .text("100%");

    svg
      .append("text")
      .attr("x", width / 2 - 40)
      .attr("y", height / 2 - 115)
      .attr("text-anchor", "left")
      .style("font-size", "12px")
      .style("font-weight", "bold")
      .style("font-family", "'Suisse Screen', sans-serif")
      .attr("fill", colorHightlight)
      .text("0%");
  }

  function createAnzahl() {
    const Abstimmungen = svg
      .append("text")
      .attr("x", width / 2 - 450)
      .attr("y", height / 2)
      .attr("text-anchor", "left")
      .style("font-size", "14px")
      .style("font-weight", "bold")
      .style("font-family", "'Suisse Screen', sans-serif")
      .attr("fill", colorText)
      .text("Anzahl Abstimmungen")

      .on("mouseover", handleAnzahlHover)
      .on("mouseout", handleAnzahlMouseout);

    function handleAnzahlHover() {
      svg.select("#z").attr("fill", colorHightlight);
    }

    function handleAnzahlMouseout() {
      svg.select("#z").attr("fill", colorText);
    }

    const Anzahl = svg
      .append("text")
      .attr("id", "z")
      .attr("x", width / 2)
      .attr("y", height / 2)
      .attr("text-anchor", "middle")
      .style("font-size", "18px")
      .style("font-weight", "bold")
      .style("font-family", "'Suisse Screen', sans-serif")
      .attr("fill", colorText)
      .text("683");

    svg
      .append("line")
      .attr("x1", width / 2 - 30)
      .attr("y1", height / 2 - 5)
      .attr("x2", width / 2 - 280)
      .attr("y2", height / 2 - 5)
      .attr("stroke-weight", 2)
      .attr("stroke", colorHightlight);
  }

  createArcs();
  createKategorie();
  createStimmbeteiligung();
  createThema();
  createAnzahl();

  document.getElementById("legende-container").appendChild(svg.node());
}

createLegende();
