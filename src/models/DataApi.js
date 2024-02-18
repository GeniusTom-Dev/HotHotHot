export class DataApi {
    constructor() {
        this.url = 'https://hothothot.dog/api/capteurs';

        console.log(JSON.parse(this.getTemperature()));
    }

    async getTemperature() {
        const response = await fetch(this.url);
        return await response.json();
    }

}