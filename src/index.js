import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

var sqrArr = [];
var redSquares = [];
var blueSquares = [];
var playerTurn = true;

function handleMove() {
    if(sqrArr.length === 4)
    {
        if(isLShaped())
        {
            handleValid();
        }
        else
        {
            clearSquares(sqrArr);
            sqrArr = [];
        }
    }
    else
    {
        clearSquares(sqrArr);
        sqrArr = [];
    }
}

function clearSquares(arr) {
    if(arr === sqrArr)
    {
        for (let i = 0; i < arr.length; i++) {
            document.getElementById(arr[i].props.id).style.backgroundColor = "white";            
        }
    }
    else //Fix removing squares that overlap
    {
        for (let i = 0; i < arr.length; i++) {
            if(sqrArr[i].props.position !== arr[i].props.position)
            {
                document.getElementById(arr[i].props.id).style.backgroundColor = "white"; 
            }           
        }
    }
}

function handleValid() {
    
    if(playerTurn) {
        if(redSquares.length !== 0)
        {
            clearSquares(redSquares);
        }
        redSquares = [];
        redSquares = sqrArr;
    } 
    else 
    {
        if(blueSquares.length !== 0)
        {
            clearSquares(blueSquares);
        }
        blueSquares = [];
        blueSquares = sqrArr;
    }
    playerTurn ^= true;
    for (let i = 0; i < 4; i++) {
        if(playerTurn)
        {
            document.getElementById(blueSquares[i].props.id).style.backgroundColor = "pink";
        }
        else
        {
            document.getElementById(redSquares[i].props.id).style.backgroundColor = "lightblue";
        }
    }
    sqrArr = [];
}

function isLShaped() {
    if (sqrArr[0].props.position[0] === sqrArr[1].props.position[0] && sqrArr[1].props.position[0] === sqrArr[2].props.position[0] && (sqrArr[2].props.position[0] === sqrArr[3].props.position[0] + 1 || sqrArr[2].props.position[0] === sqrArr[3].props.position[0] - 1) 
    || (sqrArr[0].props.position[1] === sqrArr[1].props.position[1] && sqrArr[1].props.position[1] === sqrArr[2].props.position[1] && (sqrArr[2].props.position[1] === sqrArr[3].props.position[1] + 1 || sqrArr[2].props.position[1] === sqrArr[3].props.position[1] - 1)) 
    || (sqrArr[3].props.position[0] === sqrArr[2].props.position[0] && sqrArr[2].props.position[0] === sqrArr[1].props.position[0] && (sqrArr[1].props.position[0] === sqrArr[0].props.position[0] + 1 || sqrArr[1].props.position[0] === sqrArr[0].props.position[0] - 1))
    || (sqrArr[3].props.position[1] === sqrArr[2].props.position[1] && sqrArr[2].props.position[1] === sqrArr[1].props.position[1] && (sqrArr[1].props.position[1] === sqrArr[0].props.position[1] + 1 || sqrArr[1].props.position[1] === sqrArr[0].props.position[1] - 1)) )
    {
        return true;
    }
    else
    {
        return false;
    }
}

class Square extends React.Component {
    constructor(props) {
        super(props);
        this.state = { }
    }

    handleClick(id) {
        if(playerTurn)
        {
            if(sqrArr.length < 4 && !blueSquares.includes(this)) 
            {
                let square = document.getElementById(id);
        
                square.style.backgroundColor = playerTurn ? "blue" : "red";
    
                sqrArr.push(this);
            }
        }
        else
        {
            if(sqrArr.length < 4 && !redSquares.includes(this)) 
            {
                let square = document.getElementById(id);
        
                square.style.backgroundColor = playerTurn ? "blue" : "red";
    
                sqrArr.push(this);
            }
        }
    }

    handleHover(id) {
        if(playerTurn)
        {
            if(mouseDown && sqrArr.length < 4 && !blueSquares.includes(this) && !sqrArr.includes(this)) 
            {
                let square = document.getElementById(id);
        
                square.style.backgroundColor = playerTurn ? "blue" : "red";
                this.setState({ color: false });
    
                sqrArr.push(this);
            }
        }
        else
        {
            if(mouseDown && sqrArr.length < 4 && !redSquares.includes(this) && !sqrArr.includes(this)) 
            {
                let square = document.getElementById(id);
        
                square.style.backgroundColor = playerTurn ? "blue" : "red";
                this.setState({ color: false });
    
                sqrArr.push(this);
            }
        }
    }
    
    render() {
        return (
            <button 
                className="square" 
                id={this.props.id} 
                onMouseOverCapture={(e) => this.handleHover(this.props.id)}
                onMouseDown={(e) => this.handleClick(this.props.id)}>
            </button>
        );
    }
}

class App extends React.Component {

    renderSquares() {
        let arr = [];
        let x = 0

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                arr.push(<Square position={[j%4, i%4]} id={x} key={x} value={x}/>);
                x++;
            }
        }

        return arr;
    }

    render() {
        return (
            <div>
                <h1 className="title">L Game</h1>
                <div className="gameboard">
                    {this.renderSquares()}
                </div>
            </div>
        );
    }
}

var mouseDown = 0;
document.body.onmousedown = function() {
    ++mouseDown;
}
document.body.onmouseup = function() {
    mouseDown = 0;
    handleMove()
}

ReactDOM.render(<App />,document.getElementById('root'));
