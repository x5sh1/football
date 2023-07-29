class Player {
    svgElement;
    svgText;

    constructor(positionName, cx, cy) {
        this.svgElement = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        this.svgElement.setAttribute("cx", cx);
        this.svgElement.setAttribute("cy", cy);
        this.svgElement.setAttribute("r", "20");
        this.svgElement.setAttribute("stroke", "black");
        this.svgElement.setAttribute("fill", "black");

        this.svgText = document.createElementNS("http://www.w3.org/2000/svg", "text");
        this.svgText.textContent = positionName;
        this.svgText.setAttribute("x", cx);
        this.svgText.setAttribute("y", cy);
        this.svgText.setAttribute("fill", "white");
    }

    goLine(playground) {
        playground.appendChild(this.svgElement);
        playground.appendChild(this.svgText);
    }
}