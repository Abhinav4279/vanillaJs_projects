const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let size = 50;

canvas.addEventListener('mousedown', () => {

});

function drawCircle(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, size, 0, 2 * Math.PI);
    ctx.fill();
}

// drawCircle(50, 50);

function draw() {
    drawCircle(100, 100);

    requestAnimationFrame(draw);
}

draw();