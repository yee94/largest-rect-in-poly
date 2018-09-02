var should = require("should");
var findLargestRect = require("../index");
var testPolygons = require("./polygons.json");
var debugSVG = require("./debug-svg");

function makePoint(pair) {
	return {x: pair[0], y: pair[1]};
}

function writeDebug(polygon, rectangle) {
	var svg = debugSVG(polygon.map(makePoint));
	svg = svg.substring(0, svg.length - 6);
	svg += ' <rect x="' + (rectangle.cx - (rectangle.width / 2)) + '" y="' +
		(rectangle.cy - (rectangle.height / 2)) + '" width="' + rectangle.width +
		'" height="' + rectangle.height + '" fill="orange" stroke-width="0" ' +
		'fill-opacity="0.5" transform="rotate(' + rectangle.angle + ' ' + rectangle.cx + ' ' + rectangle.cy + ')" />';
	svg += " </svg>";
	return svg;
}

describe("largest-rect-in-poly", function() {
	it("should find the largest rectangle in a triangle", function(){
		// diffcult to calculate triangles center.
		var polygon = [[0, 0], [0, 30], [40, 0]];
		var rectangle = findLargestRect(polygon);
		should(rectangle[0]).have.property("cx");
		should(rectangle[0]).have.property("cy");
		should(rectangle[0]).have.property("width");
		should(rectangle[0]).have.property("height");
		var rectArea = rectangle[1];
		rectArea.should.be.within(240, 300);
	});
	it("should find the largest rectangle in a perfect square", function(){
		var polygon = [[0, 0], [0, 1000], [1000, 1000], [1000, 0]];
		var rectangle = findLargestRect(polygon);
		should(rectangle[0]).have.property("cx", 500);
		should(rectangle[0]).have.property("cy", 500);
		var width = rectangle[0].width;
		var height = rectangle[0].height;
		should(width).be.within(980, 1020);
		should(height).be.within(980, 1020);
	});
	it("should find the largest rectangle in a perfect rectangle", function(){
		var polygon = [[0, 0], [0, 1000], [500, 1000], [500, 0]];
		var rectangle = findLargestRect(polygon);
		should(rectangle[0]).have.property("cx", 250);
		should(rectangle[0]).have.property("cy", 500);
		should(rectangle[0]).have.property("width");
		should(rectangle[0]).have.property("height");
		var width = rectangle[0].width;
		var height = rectangle[0].height;
		width.should.be.within(990, 1010);
		height.should.be.within(490, 510);
	});

	var variants = [
		{
			polygon: "simple",
			bounds: [855000, 885000],
			tries: 250
		}, {
			polygon: "largerRectangle",
			bounds: [230000, 250000]
		}, {
				polygon: "medium",
			bounds: [90500, 95000]
		}, {
			polygon: "complex",
			bounds: [300500, 335000],
			tries: 40
		}, {
			polygon: "veryComplex",
			bounds: [21000, 25000]
		}
	];

	describe("from polygons.json:", function() {
		variants.forEach(function(v) {
			it("should find the largest rectangle in a " + v.polygon + " polygon", function() {
				var polygon = testPolygons[v.polygon];
				var rectangle = findLargestRect(polygon, {nTries: v.tries || 20});
				should(rectangle[0]).have.property("cx");
				should(rectangle[0]).have.property("cy");
				should(rectangle[0]).have.property("width");
				should(rectangle[0]).have.property("height");
				var rectArea = rectangle[1];
				rectArea.should.be.within(v.bounds[0], v.bounds[1]);
			});
		});
	});
});
