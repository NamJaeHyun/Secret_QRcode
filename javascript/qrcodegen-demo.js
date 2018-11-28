"use strict";


var app = new function () {

	function initialize() {
		var elems = document.querySelectorAll("input[type=number], textarea");
		for (var i = 0; i < elems.length; i++) {
			if (elems[i].id.indexOf("version-") != 0)
				elems[i].oninput = redrawQrCode;
		}
		elems = document.querySelectorAll("input[type=radio], input[type=checkbox]");
		for (var i = 0; i < elems.length; i++)
			elems[i].onchange = redrawQrCode;
		redrawQrCode();
	}


	function redrawQrCode() {

		// Reset output images in case of early termination
		var canvas = document.getElementById("qrcode-canvas");
		var svg = document.getElementById("qrcode-svg");
		canvas.style.display = "none";
		svg.style.display = "none";

		// Get form inputs and compute QR Code
		var ecl = qrcodegen.QrCode.Ecc.LOW
		var text = document.getElementById("text-input").value;
		var segs = qrcodegen.QrSegment.makeSegments(text);
		var minVer = 1;
		var maxVer = 40;
		var mask = -1;
		var boostEcc = 1;
		var qr = qrcodegen.QrCode.encodeSegments(segs, ecl, minVer, maxVer, mask, boostEcc);

		// Draw image output
		qr.drawCanvas(8, 4, canvas);
		canvas.style.removeProperty("display");


		// Returns a string to describe the given list of segments.
		function describeSegments(segs) {
			if (segs.length == 0)
				return "none";
			else if (segs.length == 1) {
				var mode = segs[0].mode;
				var Mode = qrcodegen.QrSegment.Mode;
				if (mode == Mode.NUMERIC) return "numeric";
				if (mode == Mode.ALPHANUMERIC) return "alphanumeric";
				if (mode == Mode.BYTE) return "byte";
				if (mode == Mode.KANJI) return "kanji";
				return "unknown";
			} else
				return "multiple";
		}
	}


	this.handleVersionMinMax = function (which) {
		var minElem = document.getElementById("version-min-input");
		var maxElem = document.getElementById("version-max-input");
		var minVal = 1;
		var maxVal = 40;
		minVal = Math.max(Math.min(minVal, qrcodegen.QrCode.MAX_VERSION), qrcodegen.QrCode.MIN_VERSION);
		maxVal = Math.max(Math.min(maxVal, qrcodegen.QrCode.MAX_VERSION), qrcodegen.QrCode.MIN_VERSION);
		if (which == "min" && minVal > maxVal)
			maxVal = minVal;
		else if (which == "max" && maxVal < minVal)
			minVal = maxVal;
		minElem.value = minVal.toString();
		maxElem.value = maxVal.toString();
		redrawQrCode();
	}


	initialize();
}
