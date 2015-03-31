// 5 x 5 grid
// 10 guesses
// ship is placed randomly

//create the grid
// use random method to select where the ship will go
//assign the value of the ship to the value of the grid spot
//prompt the user to guess location of boat
//if use input = ship value, then return "you win"
// if incorrect, +1 to number of attempts
// if number of attempts = 10, return "you loose"
//note, ship is 3 length (can't go off the course)

//setting the board (instead of array of arrays)
var width = 5;
var height = 5;

// creating the board
function Vector(x, y) {
    return { x: x,
             y: y,
             add: function (other) {
                 return new Vector(x + other.x, y + other.y);
             },
             toString: function() {
                 return "(" + x + "," + y + ")";
             }
           };
}

// Verticle and Horizontal values
var Horizontal = Vector(1, 0);
var Verticle = Vector(0, 1);

// Extend Array class with pickRandom method
Array.prototype.pickRandom = function () {
    var random = Math.floor( Math.random() * this.length );
    return this[random];
};

// Returns a random orientation
function randomOrientation() {
    return [ Horizontal, Verticle ].pickRandom();
}

// Generates random integers
function randomInteger(maximum) {
    return Math.floor( Math.random() * maximum);
}

// Generates random positions
function randomPosition() {
    return Vector( randomInteger(width), randomInteger(height) );
}


// Creating a ship class, so the object can be reused
function Ship(position, orientation, length) {
    return { position: position,
             orientation: orientation,
             length: length,
             hits: (function () {
                var result =  [];
                for(var i = 0; i !== length; i++){
                    result.push(0);
                }
                return result;
            })(),

             usedPositions: function() {
                 var result = [];
                 var current = position;
                 for ( var i = 0; i != length; i++ ) {
                     result.push(current);
                     current = current.add(orientation);
                 }
                 return result;
             }
           };
}

// Checks if x is a memeber of the Array
Array.prototype.member = function (x) {
    for(var i = 0; i !== this.length; i++)
    {
        if(x === this[i]){
            return true;
        }
    }
    return false;
};

// Checks sf xs overlaps with the Array
Array.prototype.overlaps = function (xs) {
    for(var i= 0; i !== xs.length; i++)
    {
        if(this.member(xs[i])){
            return true;
        }
    }
    return false;

};

// Generates a random ship with a set length of 3
function battleship(size) {
    return Ship(randomPosition(), randomOrientation(), 3);
}

// Checks if all elements of xs equal x
function allEquals(xs, x) {
    var all = true;
    for (var i = 0; i != xs.length; i++) {
        if(xs[i] !== x)
            all = false;
    }
    return all;
}

// Generates an Array with battleships
function battleship(sizes) {
    var occupiedPositions = [];
    var ships = [];
    sizes = sizes.slice();

    while ( sizes.length > 0 ) {
        var currentSize = sizes.pop();

        var candidate = battleship(currentSize);
        var candidateSpaces = candidate.usedPositions();
        //check to see if the ship goes over the playing board
        if ( candidateSpaces.overlaps(occupiedPositions) ) {
            sizes.push(currentSize);
        }
        else {
            occupiedPositions = occupiedPositions.concat(candidateSpaces);
            ships.push(candidate);
        }

    }

    for(var i = 0; i !== ships.length; i++) {
        document.write(ships[i].usedPositions());
        document.write(" ||| ");
    }
    return ships;
}

// The game
function gameon(){
    inputArray = [4,3,2];
    var ships = battleship(inputArray);
    var currentship = 0;
    var sunkenShip = 0;
    var numberOfTurns = 0;
     while(sunkenShip !== inputArray.length ) {
        var bingo= false;
        var target = "(" + prompt("Enter targetcoordinate (x,y)") + ")";
        for(var i = 0; i !== inputArray.length; i++) {
            for(var j = 0; j !== ships[i].usedPositions().length; j++) {

                if(target === ships[i].usedPositions()[j].toString()) {
                    bingo = true;
                    ships[i].hits[j] = 1;

                    currentship = ships[i];
                }
                else {
                    currentship = ships[i];

                }
            }
        }

      if(bingo)
            alert ("Hit!");

       else
            alert ("You've Missed!");

        if(allEquals(currentship.hits, 1)) {
            alert("Ship has sunken!");
             sunkenShip++;
        }
        numberOfTurns++;
        }
        if (numberofTurns = 10) {
        alert("you've lost");
        }

    alert("You've won!");
}

gameon();


