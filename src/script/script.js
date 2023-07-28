const svgConst = document.body.querySelector("svg");
const cPlayer = document.createElementNS("http://www.w3.org/2000/svg", "circle");
cPlayer.setAttribute("cx", "250");
cPlayer.setAttribute("cy", "400");
cPlayer.setAttribute("r", "20");
cPlayer.setAttribute("stroke", "black");
cPlayer.setAttribute("fill", "none");
svgConst.append(cPlayer);

console.log(svgConst.querySelector("circle").constructor);
