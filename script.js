let xPos, yPos, currentDiv, newDiv; 
let currentIdNum = 0

// movable item class 
class MovableDiv { 

    // create new movable div
    constructor() {
        // creating main div element 
        this.div = document.createElement('div');
        this.div.id = this;
        this.div.className = 'movable'; 
        this.xOffset = 0; 
        this.yOffset = 0; 
        document.body.appendChild(this.div); 
        this.div.addEventListener('click', () => this.clickedDiv());

        // creating output div
        this.output = document.createElement('div'); 
        this.output.className = 'output';
        this.div.appendChild(this.output); 

        // creating input divs 
        this.input1 = document.createElement('div');
        this.input1.className = 'input'; 
        this.div.appendChild(this.input1); 
        this.input2 = document.createElement('div'); 
        this.input2.className = 'input'; 
        this.input2.style.top = '3vw'; 
        this.div.appendChild(this.input2); 
    }

    // if div clicked, set current if not already current else set not current 
    clickedDiv() {
        if (this === currentDiv) { 
            this.div.style.backgroundColor = "rgb(150, 150, 150)";
            // if already current div and top bar clicked delete object 
            if (yPos < document.getElementById('top-bar').getBoundingClientRect()['height']) { 
                this.div.parentNode.removeChild(this.div); 
            }
            currentDiv = null; 
        } 
        else if (this != currentDiv) { 
            currentDiv = this; 
            this.div.style.backgroundColor = "rgb(0, 150, 150)";
            var rect = this.div.getBoundingClientRect(); 
            this.xOffset = xPos - rect['x']; 
            this.yOffset = yPos - rect['y']; 
        }
    }

    // set position of div if mouse moved 
    setDivPosition() { 
        this.div.style.left = xPos - this.xOffset + 'px'; 
        this.div.style.top = yPos - this.yOffset + 'px'; 
    }
}

// function to create new movable divs if button is clicked 
function createNewDiv() { 
    newDiv = new MovableDiv()
}

// only calls when DOM loaded 
window.addEventListener("DOMContentLoaded", () => {

    // function to store current mouse position
    function setMousePosition(e) { 
        xPos = e.clientX;
        yPos = e.clientY;
        if (currentDiv != null) { 
            currentDiv.setDivPosition(); 
        }
    }

    document.body.addEventListener("mousemove", setMousePosition);

})