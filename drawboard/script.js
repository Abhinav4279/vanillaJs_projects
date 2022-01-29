const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const incEl = document.getElementById('inc');
const decEl = document.getElementById('dec');
const sizeEl = document.querySelector('span');
const colorEl = document.getElementById('color');
const clearEl = document.getElementById('clear');

let size = 10;
let isPressed = false;
let color = 'black';
let x = undefined;
let y = undefined;

canvas.addEventListener('mousedown', (e) => {
    isPressed = true;
    x = e.offsetX;
    y = e.offsetY;
});

canvas.addEventListener('mouseup', () => {
    isPressed = false;
    x = undefined;
    y = undefined;
});

canvas.addEventListener('mousemove', (e) => {
    if(isPressed) {   
        let x2 = e.offsetX;
        let y2 = e.offsetY;

        drawCircle(x2, y2);

        drawLine(x, y, x2, y2);
        x = x2;
        y = y2;
    }
});

function drawCircle(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, size, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
}

function drawLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = color;
    ctx.lineWidth = 2*size;
    ctx.stroke();
}

incEl.addEventListener('click', () => {
    if(size <= 50)
        size +=2;

    showSize();
});

decEl.addEventListener('click', () => {
    if(size >= 2)
        size -=2;

    showSize();
});

function showSize() {
    sizeEl.innerText = size;
}

colorEl.addEventListener('change', (e) => {
    color = e.target.value;
});

clearEl.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
})