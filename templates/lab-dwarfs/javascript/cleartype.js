"use strict";
function putchar(a, canvas, x0, y0) {
    for (let y = 0; y < 8; ++y) {
        const char = FONT[a][y];
        for (let x = 0; x < 6; ++x) {
            const bit = char >> (5 - x) & 1;
            if (bit) {
                canvas.fillRect(3 /* B_SCALE */ * x + x0, 3 /* B_SCALE */ * y + y0, 3 /* B_SCALE */, 3 /* B_SCALE */);
            }
        }
    }
}
function write(a, canvas, x0, y0) {
    for (let x = 0; x < a.length; ++x) {
        putchar(a.charCodeAt(x), canvas, 6 * 3 /* B_SCALE */ * x + x0, y0);
    }
}
