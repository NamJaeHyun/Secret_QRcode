"use strict";

var app = new function () {

	function initialize() {
		var elems = document.querySelectorAll("input[type=number], textarea");
		for (var i = 0; i < elems.length; i++) {
			if (elems[i].id.indexOf("version-") != 0)
				elems[i].oninput = redrawQrCode;
		}
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
		var qr = qrcodegen.QrCode.encodeSegments(segs, ecl, 1, 40, -1, 1);

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


	initialize();
}
