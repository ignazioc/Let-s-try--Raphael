String.prototype.lpad = function(padString, length) {
	var str = this;
	while (str.length < length)
		str = padString + str;
	return str;
}


Raphael.fn.clock = function(x,y,w,h,margin, radious) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.margin = margin;
	this.radious = radious;

	this.dots = new Array();
	this.label;

	this.createClock = function () {

		this.label = paper.text(this.x + this.w / 2,this.y+this.h + 20, "-").attr({ "font-size": 16, "font-family": "Arial, Helvetica, sans-serif" });

		var r1 = paper.rect(this.x,this.y,this.w,this.h,0).attr({fill: "black"});
		for (var i = 0; i < 8; i++) {
			var index;
			var xoffset;
			if (i >= 4) {
				index = i - 4;
			} else {
				index = i;
			}
			if ( i >= 4){
				xoffset =  (margin + 2*radious);
			} else {
				xoffset = 0;
			}
			var centerY = y + h - radious - margin - index * ( 2 * radious + margin)
			var centerX = x + w - radious - margin - xoffset;

			this.dots.push(paper.circle(centerX , centerY ,radious).attr({ "fill": "#333", "stroke": "none"}));

		}
		return r1;	
	}

	this.updateTime = function(time) {
		this.time = time;
		var binary = this.time;
		binary = binary.toString(2).lpad("0",8);

		for (var i = 0; i < 8; i++) {
			var dot = this.dots[i];
			var color;
			if (binary.charAt(7 - i) == "1") {
				color = "red";

			} else {
				color = "#333";
			}
			dot.animate({fill: color}, 250,"linear");

			this.label.attr("text", time);
		}
	}
	return this
}






var paper = Raphael("canvas", 520,320);
var title = paper.text(260,25, "Binary Clock made with Raphaël");
title.attr({ "font-size": 22, "font-family": "Arial, Helvetica, sans-serif" });


var secSlice = new paper.clock(350,50,110, 210,10,20);
secSlice.createClock();

var minuteSlice = new paper.clock(200,50,110,210,10,20);
minuteSlice.createClock();

var hoursSlice = new paper.clock(50,50,110, 210,10,20);
hoursSlice.createClock();

setInterval(function(){
	var data = new Date();
	var sec = data.getSeconds();
	var minutes = data.getMinutes();
	var hours = data.getHours();

	secSlice.updateTime(sec);
	minuteSlice.updateTime(minutes);
	hoursSlice.updateTime(hours);
},1000);