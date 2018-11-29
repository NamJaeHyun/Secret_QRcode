/* 
 * QR Code generator demo (JavaScript)
 * 
 * Copyright (c) Project Nayuki. (MIT License)
 * https://www.nayuki.io/page/qr-code-generator-library
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 * - The above copyright notice and this permission notice shall be included in
 *   all copies or substantial portions of the Software.
 * - The Software is provided "as is", without warranty of any kind, express or
 *   implied, including but not limited to the warranties of merchantability,
 *   fitness for a particular purpose and noninfringement. In no event shall the
 *   authors or copyright holders be liable for any claim, damages or other
 *   liability, whether in an action of contract, tort or otherwise, arising from,
 *   out of or in connection with the Software or the use or other dealings in the
 *   Software.
 */

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
