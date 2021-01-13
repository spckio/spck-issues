"use strict";
function setupCanvas(canvasId) {
    const canvas = $(canvasId);
    canvas.width = SCREEN_WIDTH;
    canvas.height = SCREEN_HEIGHT;
    return canvas.getContext('2d');
}
function renderBuf(width, height, render) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    render(canvas.getContext('2d'));
    return canvas;
}
