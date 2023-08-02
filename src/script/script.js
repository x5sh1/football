let playerIdCount = 1;
let playerIdAndPlayerMap = {};
let focusedPlayer = null;

class Player {
    playerId;
    svgElement;
    svgText;
    pathElement

    initX;
    initY;

    currentX;
    currentY;

    focused;
    pathEmpty;

    constructor(positionName, cx, cy) {
        this.focused = false;
        this.pathEmpty = true;
        this.playerId = playerIdCount;
        playerIdCount++;
        this.initX = cx;
        this.initY = cy;
        this.currentX = cx;
        this.currentY = cy;
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
        this.svgText.setAttribute("id", this.playerId);
        if (positionName.length == 2) {
            this.svgText.setAttribute("x", Number(cx) - 11);
        } else {
            this.svgText.setAttribute("x", cx - 5);
        }
    }

    playerSet(playground) {
        playground.appendChild(this.svgElement);
        playground.appendChild(this.svgText);
        this.svgElement.addEventListener("click", function(e) {
            if (PlaygroundStatusEnum.PALYER_FOCUSED == playgroundStatus) {
                var id = e.target.getAttribute("id");
                if (id == focusedPlayer.playerId) {
                    focusedPlayer.focused = false;
                    e.target.setAttribute("fill", "black");
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
            e.target.setAttribute("fill", "red");
            focusedPlayer = playerIdAndPlayerMap[id];
        });
    }

    playerHut() {
        if (this.pathElement == null) {
            return;
        }
        var pathString = this.pathElement.getAttribute("d");
        var pathList = pathString.split(" ");
        pathString = "M0,0";
        for (var i = 1; i < pathList.length; i++) {
            console.log(pathList[i]);
            pathString += " " + pathList[i];
        }
        var circleAnimateMotionElement = document.createElementNS("http://www.w3.org/2000/svg", "animateMotion");
        circleAnimateMotionElement.setAttributeNS("http://www.w3.org/1999/xlink", "dur", "5s");
        circleAnimateMotionElement.setAttributeNS("http://www.w3.org/1999/xlink", "path", pathString);

        var textAnimateMotionElement = document.createElementNS("http://www.w3.org/2000/svg", "animateMotion");
        textAnimateMotionElement.setAttributeNS("http://www.w3.org/1999/xlink", "dur", "5s");
        textAnimateMotionElement.setAttributeNS("http://www.w3.org/1999/xlink", "path", pathString);

        this.svgElement.appendChild(circleAnimateMotionElement);
        this.svgText.appendChild(textAnimateMotionElement);
        circleAnimateMotionElement.beginElement()
        textAnimateMotionElement.beginElement()
    }

    addPath(newX, newY, playground) {
        if (!this.focused) {
            this.focused = true;
            return;
        }
        if (this.pathEmpty) {
            this.pathElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
            this.pathElement.setAttribute("stroke", "black");
            this.pathElement.setAttribute("fill", "none");
            this.pathElement.setAttribute("d", "M" + this.initX +"," + this.initY);
            this.pathEmpty = false;
        }
        let diffX = newX - this.currentX;
        let diffY = newY - this.currentY;
        var dString = this.pathElement.getAttribute("d");
        dString += " l" + diffX + "," + diffY;
        this.pathElement.setAttribute("d", dString);
        playground.appendChild(this.pathElement);
        this.currentX = newX;
        this.currentY = newY;
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
        tempPlayer.playerSet(playground);
        playerIdAndPlayerMap[tempPlayer.playerId] = tempPlayer;
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

const hutButton = document.getElementById("hutButton");
hutButton.addEventListener("click", function(e) {
    if (PlaygroundStatusEnum.DISPLAY != playgroundStatus) {
        return;
    }
    for (var index = 1; index < playerIdCount; index++) {
        console.log(playerIdAndPlayerMap[index]);
        playerIdAndPlayerMap[index].playerHut();
    }
});
