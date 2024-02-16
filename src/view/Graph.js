export class Graph {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = window.innerWidth * 2 / 3 * 4 / 5;
        this.canvas.height = window.innerHeight * 2 / 3 * 4 / 5;
        this.canvasWidth = this.canvas.width - 10;
        this.canvasHeight = this.canvas.height -10;
        this.gridSize = this.canvasHeight / 6;
        this.gridColor = 'rgba(255,255,255,0.2)';
    }

    drawGrid() {
        for (let x = this.gridWidth; x <= this.canvasWidth; x += this.gridWidth) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.canvas.height);
            this.ctx.strokeStyle = this.gridColor;
            this.ctx.stroke();
        }
        for (let y = this.gridSize; y <= this.canvasHeight; y += this.gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(20, y);
            this.ctx.lineTo(this.canvas.width + 10, y);
            this.ctx.strokeStyle = this.gridColor;
            this.ctx.stroke();
        }
    }

    drawYAxisValues() {

        this.ctx.fillStyle = 'white';
        this.ctx.font = '15px Arial';
        this.ctx.textAlign = 'left';

        for (let i = 0; i <= 5; i++) {
            const value = this.gap * i + this.minValue;
            const y = this.canvasHeight - this.gridSize * i;
            this.ctx.fillText(value.toFixed(0), 0, y + 5);
        }
    }

    calculateDataPoints(data) {
        return data.map((value, index) => ({
            x: (index + 1) * this.gridWidth,
            y: this.getY(value)
        }));
    }

    getY(value) {
        if(value === this.minValue) {
            return this.canvasHeight - ((value - this.minValue ) * this.gridHeightunit)
        }
        else if(value === this.maxValue) {
            return this.canvasHeight - ((value - this.minValue ) * this.gridHeightunit)
        }
        else {
            return this.canvasHeight - ((value - this.minValue ) * this.gridHeightunit)
        }
    }

    drawCurve(dataPoints) {
        this.ctx.beginPath();
        for (let i = 0; i < dataPoints.length; i++) {
            this.ctx.lineTo(dataPoints[i].x, dataPoints[i].y);
        }
        this.ctx.strokeStyle = 'black';
        this.ctx.lineWidth = 3;
        this.ctx.stroke();
    }

    drawPoints(dataPoints) {
        for (let i = 0; i < dataPoints.length; i++) {
            this.ctx.beginPath();
            this.ctx.strokeStyle = 'white';
            this.ctx.arc(dataPoints[i].x, dataPoints[i].y, 3, 0, Math.PI * 2);
            // this.ctx.fillStyle = '#050d2a';
            this.ctx.fillStyle = 'white';
            this.ctx.fill();
            this.ctx.stroke();
        }
    }

    drawGraph() {
        const data = [0, 4, 7,8,9,10,11,12,13,14,15, 20, 2, 6, -6, 9, 10, 5, 15,12,13,-13];
        this.minValue  = Math.min(...data) < 0 ? Math.min(...data) : 0;
        this.maxValue = Math.max(...data);
        this.gridWidth = this.canvasWidth / data.length;
        this.gap = this.minValue - (this.minValue + (this.maxValue - this.minValue) * (1 / 5)).toFixed(0);
        this.gap = this.gap > 0 ? this.gap : this.gap*-1;
        this.gridHeightunit = this.gridSize / this.gap ;
        console.log(this.gap);
        this.drawGrid();
        this.drawYAxisValues();
        const dataPoints = this.calculateDataPoints(data);
        console.log(dataPoints);
        this.drawCurve(dataPoints);
        this.drawPoints(dataPoints);
    }

    clearGraph() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}