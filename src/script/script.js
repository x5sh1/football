class Player {
    svgElement;
    svgText;
    initX;
    initY;
    
    pathList;

    constructor(positionName, cx, cy) {
        this.initX = cx;
        this.initY = cy;
        this.pathList = [];
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
        this.svgElement.addEventListener("click", function(e) {
            console.log(e.target);
            if (PlaygroundStatusEnum.ADD_PATH ==! playgroundStatus) {
                return;
            }
            playgroundStatus = PlaygroundStatusEnum.PALYER_FOCUSED;
        });
    }

    addPath(newX, newY, playground) {
        if (pathList.length == 0) {
            const pathElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
            pathElement.setAttribute("stroke", "black");
            pathElement.setAttribute("fill", "none");
            pathElement.setAttribute("d", "M0,0");
            let diffX = newX - this.initX;
            let diffY = newY - this.initY;
            dString = pathElement.getAttribute("d");
            dString += " l" + diffX + "," + diffY;
            pathElement.setAttribute("d", dString);
            playground.appendChild(pathElement);
        }
        let tempPosition = [];
        tempPosition.insert(newX);
        tempPosition.insert(newY);
        pathList.insert(tempPosition);
    }
}

const PlaygroundStatusEnum = {
    DISPLAY: 0,
    ADD_PLAYER: 1,
    ADD_PATH: 2,
    // 当球员被选中
    PALYER_FOCUSED: 3 
}

let playgroundStatus = PlaygroundStatusEnum.DISPLAY;
let focusedPlayer = null;

let playerList = [];
let playerId = 0;

const playground = document.body.querySelector("svg");

playground.addEventListener("click", function(e) {
    if (PlaygroundStatusEnum.ADD_PLAYER == playgroundStatus) {
        const positionName = prompt("Enter a position");
        if (positionName == null) {
            return;
        }
        const tempPlayer = new Player(positionName, e.clientX, e.clientY);
        tempPlayer.goLine(playground);
        playerList.push(tempPlayer);
    } else if (PlaygroundStatusEnum.PALYER_FOCUSED == playgroundStatus) {
        if (focusedPlayer == null) {
            return;
        }
        focusedPlayer.addPath(e.clientX, e.clientY, playground);
    }
});


const addPlayerButton = document.getElementById("addPlayerButton");
addPlayerButton.addEventListener("click", function(e) {
    if (PlaygroundStatusEnum.DISPLAY != playgroundStatus 
        & PlaygroundStatusEnum.ADD_PLAYER != playgroundStatus) {
        return;
    }
    if ("Add Player" == addPlayerButton.textContent) {
        playgroundStatus = PlaygroundStatusEnum.ADD_PLAYER;
        addPlayerButton.textContent = "Add Player Done";
    } else {
        playgroundStatus = PlaygroundStatusEnum.DISPLAY;
        addPlayerButton.textContent = "Add Player";
    }
});

const addPathButton = document.getElementById("addPathButton");
addPathButton.addEventListener("click", function(e) {
    if (PlaygroundStatusEnum.DISPLAY != playgroundStatus
        & PlaygroundStatusEnum.ADD_PATH != playgroundStatus) {
        return;
    }
    if ("Add Path" == addPathButton.textContent) {
        playgroundStatus = PlaygroundStatusEnum.ADD_PATH;
        addPathButton.textContent = "Add Path Done";
    } else {
        playgroundStatus = PlaygroundStatusEnum.DISPLAY;
        addPathButton.textContent = "Add Path";
    }
});
