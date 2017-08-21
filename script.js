// Add your JavaScript below!
var colors = ["purple", "red", "yellow", "green", "violet", "gray", "blue"];

var canvas;
var context;
var x, y, r;
var data = [];

var setUpCanvas = function() {
    //set up canvas
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');
    
    //x and y values for circle center
    x = Math.floor(canvas.width / 2);
    y = Math.floor(canvas.height / 2);
    //radius of circle
    r = Math.floor(canvas.height * 0.4);
    
    //draw frame for circle
    context.beginPath();
    context.arc(x, y, r, 0, 2*Math.PI);
    context.stroke();
};

var setInputToZero = function() {
    document.forms["data"]['v'].value = "0";
};

var clearCanvas = function() {
    context.clearRect(0,0,canvas.width, canvas.height);
    setUpCanvas();
    data = [];
    setInputToZero();
    removeRows();
};

var addTableRow = function(idx, value, color){
    var table = document.getElementById("values");
    var row = table.insertRow(idx);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    
    console.log(value);
    
	var midx = idx+1;
    cell1.innerHTML = "Figure #"+midx;
    cell2.innerHTML = ''+value;
    cell3.innerHTML = color;
};

var removeRows = function(){
    
    $("#values tbody tr").remove();
};

var redrawTable = function(){
    removeRows();
    for(var i = 0; i<data.length; i++) {
        addTableRow(i, data[i], colors[i%colors.length]);    
    }
};

$(document).ready(function() {
    setUpCanvas();
});

// Add your JavaScript below!
var drawChart = function(){

    //data input for display
    data.push(parseFloat(document.forms["data"]['v'].value, 10));
    
    console.log(data);
    
    //validates the numbers and sums them up
    var sum = 0;
    for(var j = 0; j<data.length; j++){
        if(isNaN(data[j]) || data[j] < 0){
            alert("Inputs cannot be less than 0 or characters!")
            return false;
        }
        sum += data[j];
    }
    //normalizes values
    var normValues = [];
    for(var k = 0; k<data.length;k++){
        normValues[k] = data[k]/sum;
    }
    
    //draw all the segments
    var lastEndpoint = 0;
    for(var i = 0; i < normValues.length; i++){
        //fill style is selected
        var color = colors[i%colors.length];
        context.fillStyle = color;
        
        //new Endpoint for segment
        //if it is the last segment, the segment should complete the full circle
        var newEndpoint = lastEndpoint + (normValues[i]*(2*Math.PI));
        context.beginPath();
        context.moveTo(x, y);
        context.arc(x, y, r, lastEndpoint, newEndpoint, false);
        context.closePath();
        context.fill();
        lastEndpoint = newEndpoint;
    }
    redrawTable();
    setInputToZero();
};