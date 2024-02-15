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

    drawGrid(data) {
        const gridWidth = this.canvasWidth / data.length;
        for (let x = gridWidth; x <= this.canvasWidth; x += gridWidth) {
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

    drawYAxisValues(data) {
        const minValue = Math.min(...data);
        const maxValue = Math.max(...data);

        this.ctx.fillStyle = 'white';
        this.ctx.font = '15px Arial';
        this.ctx.textAlign = 'left';

        for (let i = 0; i <= 5; i++) {
            const value = minValue + (maxValue - minValue) * (i / 5);
            const y = this.canvasHeight - this.gridSize * i;
            this.ctx.fillText(value.toFixed(0), 0, y + 5);
        }
    }


    calculateDataPoints(data) {
        const minValue = Math.min(...data);
        const maxValue = Math.max(...data);
        const gridWidth = this.canvasWidth / data.length;
        const gridHeight = this.gridSize;
        const gridHeightunit = this.gridSize / ((maxValue - minValue) / 5);

        // const gridHeightunit = this.gridSize / (Math.max(...data) / 5);
        return data.map((value, index) => ({
            x: (index + 1) * gridWidth,
            y: this.canvasHeight-(value - minValue) * gridHeightunit,
        }));
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

    drawGraph(data) {
        this.drawGrid(data);
        this.drawYAxisValues(data);
        const dataPoints = this.calculateDataPoints(data);
        this.drawCurve(dataPoints);
        this.drawPoints(dataPoints);
    }
}