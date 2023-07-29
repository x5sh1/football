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
        this.svgText.setAttribute("y", Number(cy)+5);
        this.svgText.setAttribute("fill", "white");
        if (positionName.length == 2) {
            this.svgText.setAttribute("x", Number(cx) - 11);
        } else {
            this.svgText.setAttribute("x", cx - 5);
        }
    }

    goLine(playground) {
        playground.appendChild(this.svgElement);
        playground.appendChild(this.svgText);
    }
}

const playground = document.body.querySelector("svg");
// playground.addEventListener("click", function(e) {
//     const positionName = prompt("Enter a position");
//     new Player(positionName, e.clientX, e.clientY).goLine(playground);
// });
