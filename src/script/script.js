let playerIdCount = 1;
let playerIdAndPlayerMap = {};
let focusedPlayer = null;

class Player {
    playerId;
    svgElement;
    svgText;
    initX;
    initY;
    
    pathList;

    focused

    constructor(positionName, cx, cy) {
        this.focused = false;
        this.playerId = playerIdCount;
        playerIdCount++;
        this.initX = cx;
        this.initY = cy;
        this.pathList = [];
        this.svgElement = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        this.svgElement.setAttribute("cx", cx);
        this.svgElement.setAttribute("cy", cy);
        this.svgElement.setAttribute("r", "20");
        this.svgElement.setAttribute("stroke", "black");
        this.svgElement.setAttribute("fill", "black");
        this.svgElement.setAttribute("id", this.playerId);

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
            if (PlaygroundStatusEnum.PALYER_FOCUSED == playgroundStatus) {
                var id = e.target.getAttribute("id");
                if (id == focusedPlayer.id) {
                    focusedPlayer.focused = false;
                    focusedPlayer = null;
                    playgroundStatus = PlaygroundStatusEnum.ADD_PATH;
                }
                return;
            }
            if (PlaygroundStatusEnum.ADD_PATH != playgroundStatus) {
                return;
            }
            playgroundStatus = PlaygroundStatusEnum.PALYER_FOCUSED;
            var id = e.target.getAttribute("id");
            focusedPlayer = playerIdAndPlayerMap[id];
            focusedPlayer.focused = true;
        });
    }

    addPath(newX, newY, playground) {
        if (this.pathList.length == 0) {
            const pathElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
            pathElement.setAttribute("stroke", "black");
            pathElement.setAttribute("fill", "none");
            pathElement.setAttribute("d", "M" + this.initX +"," + this.initY);
            let diffX = newX - this.initX;
            let diffY = newY - this.initY;
            var dString = pathElement.getAttribute("d");
            dString += " l" + diffX + "," + diffY;
            console.log(dString);
            pathElement.setAttribute("d", dString);
            playground.appendChild(pathElement);
        }
        let tempPosition = [];
        tempPosition.push(newX);
        tempPosition.push(newY);
        this.pathList.push(tempPosition);
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

const playground = document.body.querySelector("svg");

playground.addEventListener("click", function(e) {
    if (PlaygroundStatusEnum.ADD_PLAYER == playgroundStatus) {
        const positionName = prompt("Enter a position");
        if (positionName == null) {
            return;
        }
        const tempPlayer = new Player(positionName, e.clientX, e.clientY);
        tempPlayer.goLine(playground);
        playerIdAndPlayerMap[tempPlayer.playerId] = tempPlayer;
    } else if (PlaygroundStatusEnum.PALYER_FOCUSED == playgroundStatus) {
        if (focusedPlayer == null) {
            return;
        }
        console.log(focusedPlayer);
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
