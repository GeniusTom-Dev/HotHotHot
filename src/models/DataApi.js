export class DataApi {
    constructor() {
        this.url = 'https://hothothot.dog/api/capteurs';
    }

    async getTemperature() {
        const response = await fetch(this.url);
        return await response.json();
    }

}